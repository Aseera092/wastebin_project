import React, { useState } from 'react'
import { addUserAPI } from '../services/user';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate()

  const [userData, setUserData] = useState(
    {
      firstName: "",
      lastName: "",
      mobileNo: "",
      alternateMobileNo: "",
      emailId: "",
      houseNo: "",
      location: "",
      address: "",
      password: "",
      confirmPassword: ""
    });

  const [errors, setErrors] = useState({}); // For storing validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };


  // Validation Logic
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!userData.firstName.trim()) {
      formErrors.firstName = 'first name is required';
      isValid = false;
    }
    if (!userData.lastName.trim()) {
      formErrors.address = 'last name is required';
      isValid = false;
    }
    if (!userData.mobileNo.trim() || userData.mobileNo.length !== 10) {
      formErrors.mobileNo = 'Valid 10-digit mobile number is required';
      isValid = false;
    }
    if (userData.emailId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.emailId)) {
      formErrors.emailId = 'Invalid email format';
      isValid = false;
    }
    if (!userData.houseNo.trim()) {
      formErrors.houseNo = 'house Number is required';
      isValid = false;
    }
    if (!userData.location.trim()) {
      formErrors.location = 'location is required';
      isValid = false;
    }
    if (!userData.address.trim()) {
      formErrors.vehicleNo = 'address is required';
      isValid = false;
    }
    if (!userData.password) {
      formErrors.password = 'Password is required';
      isValid = false;
    } else if (userData.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    if (userData.confirmPassword !== userData.password) {
      formErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const submitAction = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please correct the errors before submitting');
      return;
    }

    addUserAPI(userData).then((res) => {
      if (res.status) {
        toast.success('User registered successfully');
        localStorage.setItem("userLogin", "true")
        localStorage.setItem("userId", res.data._id)
        navigate('/')
      } else {
        toast.error(res.error ? res.error : res.message);
      }
    }).catch((error) => {
      toast.error('Failed to add driver. Please try again.');
      console.error('Error in submitAction:', error);
    })
  };

  return (
    <div className='p-md-5'>
      <div className="container ">
        <div className='card p-2 p-md-5'>
          <h1>Sign Up</h1>
          <form onSubmit={submitAction}>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="" className="form-label">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  required />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>
              <div className="col-md-6">
                <label htmlFor="" className="form-label">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  required />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>
              <div className="col-md-6">
                <label htmlFor="" className="form-label">Email Id</label>
                <input
                  type="text"
                  name="emailId"
                  value={userData.emailId}
                  onChange={handleChange}
                  className={`form-control ${errors.emailId ? 'is-invalid' : ''}`}
                  required />
                {errors.emailId && <div className="invalid-feedback">{errors.emailId}</div>}
              </div>
              <div className="col-md-6">
                <label htmlFor="" className="form-label">Mobile No</label>
                <input
                  type="text"
                  name="mobileNo"
                  value={userData.mobileNo}
                  onChange={handleChange}
                  className={`form-control ${errors.mobileNo ? 'is-invalid' : ''}`}
                  required />
                {errors.mobileNo && <div className="invalid-feedback">{errors.mobileNo}</div>}
              </div>
              <div className="col-md-6">
                <label htmlFor="" className="form-label">Alternative No</label>
                <input
                  type="text"
                  name="alternateMobileNo"
                  value={userData.alternateMobileNo}
                  onChange={handleChange}
                  className={`form-control ${errors.alternateMobileNo ? 'is-invalid' : ''}`}
                />
                {errors.alternateMobileNo && <div className="invalid-feedback">{errors.alternateMobileNo}</div>}
              </div>
              <div className="col-md-6">
                <label htmlFor="" className="form-label">House Number</label>
                <input
                  type="text"
                  name="houseNo"
                  value={userData.houseNo}
                  onChange={handleChange}
                  className={`form-control ${errors.houseNo ? 'is-invalid' : ''}`}
                  required />
                {errors.houseNo && <div className="invalid-feedback">{errors.houseNo}</div>}
              </div>
              <div className="col-md-6">
                <label htmlFor="" className="form-label">Location(Landmark)</label>
                <input
                  type="text"
                  name="location"
                  value={userData.location}
                  onChange={handleChange}
                  className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                  required />
                {errors.location && <div className="invalid-feedback">{errors.location}</div>}
              </div>
              <div className="col-md-6">
                <label htmlFor="" className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                  className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                  required />
                {errors.address && <div className="invalid-feedback">{errors.address}</div>}
              </div>
              <div className="col-md-6">
                <label htmlFor="" className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  required />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <div className="col-md-6">
                <label htmlFor="" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  required />
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
              </div>
            </div>
            <div className='mt-3'>
              <button className="btn btn-success">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup;