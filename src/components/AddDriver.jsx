import React, { useState } from 'react';
import { addDriver } from '../services/driver';
import { toast } from 'react-toastify';
import { fileUploadAPI } from '../services/service';

const AddDriver = () => {
  const [driverData, setDriverData] = useState({
    driverName: '',
    address: '',
    mobileNo: '',
    alternateMobileNo: '',
    emailId: '',
    idProof: '',
    uploadIdProof: null,
    vehicleNo: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({}); // For storing validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriverData({
      ...driverData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setDriverData({
      ...driverData,
      uploadIdProof: e.target.files[0],
    });
  };

  // Validation Logic
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!driverData.driverName.trim()) {
      formErrors.driverName = 'Driver name is required';
      isValid = false;
    }
    if (!driverData.address.trim()) {
      formErrors.address = 'Address is required';
      isValid = false;
    }
    if (!driverData.mobileNo.trim() || driverData.mobileNo.length !== 10) {
      formErrors.mobileNo = 'Valid 10-digit mobile number is required';
      isValid = false;
    }
    if (driverData.emailId && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(driverData.emailId)) {
      formErrors.emailId = 'Invalid email format';
      isValid = false;
    }
    if (!driverData.idProof) {
      formErrors.idProof = 'ID Proof is required';
      isValid = false;
    }
    if (!driverData.uploadIdProof) {
      formErrors.uploadIdProof = 'ID Proof upload is required';
      isValid = false;
    } else if (!['image/jpeg', 'image/png', 'application/pdf'].includes(driverData.uploadIdProof.type)) {
      formErrors.uploadIdProof = 'Only JPEG, PNG, or PDF files are allowed';
      isValid = false;
    }
    if (!driverData.vehicleNo.trim()) {
      formErrors.vehicleNo = 'Vehicle number is required';
      isValid = false;
    }
    if (!driverData.password) {
      formErrors.password = 'Password is required';
      isValid = false;
    } else if (driverData.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    if (driverData.confirmPassword !== driverData.password) {
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

    const formData = new FormData();
    formData.append('file', driverData.uploadIdProof);

    try {
      const res = await fileUploadAPI(formData);
      if (res.file) {
        const data = { ...driverData, uploadIdProof: res.file.filename };
        const result = await addDriver(data);
        if (result.status) {
          toast.success('Driver registered successfully');
        }else{
          toast.error(result.error ? result.error : result.message);
        }
      } else {
        toast.error("File upload has an error");
      }
    } catch (error) {
      toast.error('Failed to add driver. Please try again.');
      console.error('Error in submitAction:', error);
    }
  };

  return (
    <div className="container">
      <h2>Add Driver</h2>
      <form onSubmit={submitAction}>
        <div className="row g-2 px-5 shadow p-3 mt-2 bg-white rounded">
          <div className="col col-12 col-sm-12 col-md-6">
            <label className="form-label">Driver Name</label>
            <input
              type="text"
              name="driverName"
              value={driverData.driverName}
              onChange={handleChange}
              className={`form-control ${errors.driverName ? 'is-invalid' : ''}`}
              required
            />
            {errors.driverName && <div className="invalid-feedback">{errors.driverName}</div>}
          </div>
          <div className="col col-12 col-sm-12 col-md-6">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              value={driverData.address}
              onChange={handleChange}
              className={`form-control ${errors.address ? 'is-invalid' : ''}`}
              required
            />
            {errors.address && <div className="invalid-feedback">{errors.address}</div>}
          </div>
          <div className="col col-12 col-sm-12 col-md-6">
            <label className="form-label">Mobile No</label>
            <input
              type="text"
              name="mobileNo"
              value={driverData.mobileNo}
              onChange={handleChange}
              className={`form-control ${errors.mobileNo ? 'is-invalid' : ''}`}
              required
            />
            {errors.mobileNo && <div className="invalid-feedback">{errors.mobileNo}</div>}
          </div>
          <div className="col col-12 col-sm-12 col-md-6">
            <label className="form-label">Alternate Mobile No</label>
            <input
              type="text"
              name="alternateMobileNo"
              value={driverData.alternateMobileNo}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="col col-12 col-sm-12 col-md-6">
            <label className="form-label">Email-Id</label>
            <input
              type="email"
              name="emailId"
              value={driverData.emailId}
              onChange={handleChange}
              className={`form-control ${errors.emailId ? 'is-invalid' : ''}`}
            />
            {errors.emailId && <div className="invalid-feedback">{errors.emailId}</div>}
          </div>
          <div className="col col-12 col-sm-12 col-md-6">
            <label className="form-label">Id Proof</label>
            <select
              name="idProof"
              value={driverData.idProof}
              onChange={handleChange}
              className={`form-control ${errors.idProof ? 'is-invalid' : ''}`}
              required
            >
              <option value="">--Select--</option>
              <option value="Aadhar">Aadhar</option>
              <option value="Driving License">Driving License</option>
              <option value="Pan Card">Pan Card</option>
            </select>
            {errors.idProof && <div className="invalid-feedback">{errors.idProof}</div>}
          </div>
          <div className="col col-12 col-sm-12 col-md-6">
            <label className="form-label">Upload selected Id Proof</label>
            <input
              type="file"
              name="uploadIdProof"
              onChange={handleFileChange}
              className={`form-control ${errors.uploadIdProof ? 'is-invalid' : ''}`}
              required
            />
            {errors.uploadIdProof && <div className="invalid-feedback">{errors.uploadIdProof}</div>}
          </div>
          <div className="col col-12 col-sm-12 col-md-6">
            <label className="form-label">Vehicle No</label>
            <input
              type="text"
              name="vehicleNo"
              value={driverData.vehicleNo}
              onChange={handleChange}
              className={`form-control ${errors.vehicleNo ? 'is-invalid' : ''}`}
              required
            />
            {errors.vehicleNo && <div className="invalid-feedback">{errors.vehicleNo}</div>}
          </div>
          <div className="col col-12 col-sm-12 col-md-6">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={driverData.password}
              onChange={handleChange}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              required
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <div className="col col-12 col-sm-12 col-md-6">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={driverData.confirmPassword}
              onChange={handleChange}
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              required
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>
          <div className="col col-12 col-sm-12 col-md-12 mt-3">
            <div className="d-flex gap-2 w-25 justify-content-end">
              <button className="btn btn-success w-100" type="submit">
               

                Add Driver
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDriver;
