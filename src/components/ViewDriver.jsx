import React, { useEffect, useState } from 'react';

import { deleteDriver, getDriver, updateDriver } from '../services/driver';
import { toast } from 'react-toastify';

const ViewDriver = () => {
  const [Driver, setDriver] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const init = () => {
    getDriver().then((res) => {
      setDriver(res.data);
    });
  };

  useEffect(() => {
    init();
  }, []);

  const deleteMach = (id) => {
    deleteDriver(id).then((res) => {
      if (res.status) {
        toast.success('Deleted Successfully');
        init();
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedDriver({
      ...selectedDriver,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedDriver({
      ...selectedDriver,
      uploadIdProof: e.target.files[0],
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!selectedDriver?.driverName) errors.driverName = 'Driver name is required';
    if (!selectedDriver?.address) errors.address = 'Address is required';
    if (!selectedDriver?.mobileNo || !/^[0-9]{10}$/.test(selectedDriver.mobileNo))
      errors.mobileNo = 'Valid Mobile No is required (10 digits)';
    if (
      selectedDriver?.alternateMobileNo &&
      !/^[0-9]{10}$/.test(selectedDriver.alternateMobileNo)
    )
      errors.alternateMobileNo = 'Valid Alternate Mobile No should be 10 digits';
    if (!selectedDriver?.emailId || !/\S+@\S+\.\S+/.test(selectedDriver.emailId))
      errors.emailId = 'Valid Email-ID is required';
    if (!selectedDriver?.idProof) errors.idProof = 'ID Proof is required';
    if (!selectedDriver?.vehicleNo) errors.vehicleNo = 'Vehicle No is required';
    if (!selectedDriver?.uploadIdProof) errors.uploadIdProof = 'Upload ID Proof is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitAction = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('driverName', selectedDriver.driverName);
      formData.append('address', selectedDriver.address);
      formData.append('mobileNo', selectedDriver.mobileNo);
      formData.append('alternateMobileNo', selectedDriver.alternateMobileNo);
      formData.append('emailId', selectedDriver.emailId);
      formData.append('idProof', selectedDriver.idProof);
      formData.append('uploadIdProof', selectedDriver.uploadIdProof);
      formData.append('vehicleNo', selectedDriver.vehicleNo);

      updateDriver(selectedDriver._id, formData).then((res) => {
        if (res.status) {
          init();
          toast.success('Successfully updated');
          document.getElementById('modal-close').click();
          setIsSubmitting(false);
        }
      });
    }
  };

  return (
    <div className='container'>
      <h2>Drivers</h2>
      <div className='table-container overflow-scroll p-3 px-5 shadow p-3 mt-2 bg-white rounded'>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col' noWrap='nowrap'>No</th>
              <th scope='col' noWrap='nowrap'>Driver Name</th>
              <th scope='col' noWrap='nowrap'>Address</th>
              <th scope='col' noWrap='nowrap'>Mobile No</th>
              <th scope='col' noWrap='nowrap'>Alternate Mobile No</th>
              <th scope='col' noWrap='nowrap'>Email-ID</th>
              <th scope='col' noWrap='nowrap'>ID Proof</th>
              <th scope='col' noWrap='nowrap'>Upload ID proof</th>
              <th scope='col' noWrap='nowrap'>Vehicle No</th>
              <th scope='col' noWrap='nowrap'>Status</th>
              <th scope='col' noWrap='nowrap'>Action</th>
            </tr>
          </thead>
          <tbody>
            {Driver.map((data, ind) => (
              <tr key={ind}>
                <th scope='row'>{ind + 1}</th>
                <td noWrap='nowrap'>{data.driverName}</td>
                <td noWrap='nowrap'>{data.address}</td>
                <td noWrap='nowrap'>{data.mobileNo}</td>
                <td noWrap='nowrap'>{data.alternateMobileNo}</td>
                <td noWrap='nowrap'>{data.emailId}</td>
                <td noWrap='nowrap'>{data.idProof}</td>
                <td noWrap='nowrap'><a href={`http://localhost:3005/${data.uploadIdProof}`} target='_blank' >View</a></td>
                <td noWrap='nowrap'>{data.vehicleNo}</td>
                <td>
                  <span className={data.status === 'online' ? 'badge bg-success' : 'badge bg-danger'}>
                    {data.status}
                  </span>
                </td>
                <td>
                  <div className='d-flex'>
                    <button
                      className='btn text-primary'
                      data-bs-toggle='modal'
                      data-bs-target='#editmodal'
                      onClick={() => {
                        setSelectedDriver(data);
                      }}>
                      <i className='bi bi-pencil-fill'></i>
                    </button>
                    <button className='btn text-danger' onClick={() => deleteMach(data._id)}>
                      <i className='bi bi-trash3-fill'></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className='modal fade'
          id='editmodal'
          tabIndex='-1'
          role='dialog'
          aria-labelledby='exampleModalLongTitle'
          aria-hidden='true'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <form onSubmit={submitAction}>
                <div className='modal-header justify-content-between'>
                  <h5 className='modal-title' id='exampleModalLongTitle'>
                    Update Driver{' '}
                  </h5>
                  <button type='button' id='modal-close' className='btn text-danger' data-bs-dismiss='modal' aria-label='Close'>
                    <i className='bi bi-x-circle'></i>
                  </button>
                </div>
                <div className='modal-body'>
                  <div className='row g-2'>
                    <div className='col-12'>
                      <label htmlFor='' className='form-label'>
                        Driver Name
                      </label>
                      <input
                        type='text'
                        name='driverName'
                        className='form-control'
                        value={selectedDriver?.driverName || ''}
                        onChange={handleChange}
                        required
                      />
                      {formErrors.driverName && <small className='text-danger'>{formErrors.driverName}</small>}
                    </div>
                    <div className='col-12'>
                      <label htmlFor='' className='form-label'>
                        Address
                      </label>
                      <input
                        type='text'
                        name='address'
                        className='form-control'
                        value={selectedDriver?.address || ''}
                        onChange={handleChange}
                        required
                      />
                      {formErrors.address && <small className='text-danger'>{formErrors.address}</small>}
                    </div>
                    <div className='col-12'>
                      <label htmlFor='' className='form-label'>
                        Mobile No
                      </label>
                      <input
                        type='text'
                        name='mobileNo'
                        className='form-control'
                        value={selectedDriver?.mobileNo || ''}
                        onChange={handleChange}
                        required
                      />
                      {formErrors.mobileNo && <small className='text-danger'>{formErrors.mobileNo}</small>}
                    </div>
                    <div className='col-12'>
                      <label htmlFor='' className='form-label'>
                        Alternate Mobile No
                      </label>
                      <input
                        type='text'
                        name='alternateMobileNo'
                        className='form-control'
                        value={selectedDriver?.alternateMobileNo || ''}
                        onChange={handleChange}
                      />
                      {formErrors.alternateMobileNo && (
                        <small className='text-danger'>{formErrors.alternateMobileNo}</small>
                      )}
                    </div>
                    <div className='col-12'>
                      <label htmlFor='' className='form-label'>
                        Email-Id
                      </label>
                      <input
                        type='text'
                        name='emailId'
                        className='form-control'
                        value={selectedDriver?.emailId || ''}
                        onChange={handleChange}
                        required
                      />
                      {formErrors.emailId && <small className='text-danger'>{formErrors.emailId}</small>}
                    </div>
                    <div className='col-6'>
                      <label className='form-label'>ID Proof</label>
                      <select
                        name='idProof'
                        value={selectedDriver?.idProof || ''}
                        onChange={handleChange}
                        className='form-control'
                        required>
                        <option value=''>--Select--</option>
                        <option value='Aadhar'>Aadhar</option>
                        <option value='Driving License'>Driving License</option>
                        <option value='Pan Card'>Pan Card</option>
                      </select>
                      {formErrors.idProof && <small className='text-danger'>{formErrors.idProof}</small>}
                    </div>
                    <div className='col-6'>
                      <label className='form-label'>Upload ID Proof</label>
                      <input
                        type='file'
                        name='uploadIdProof'
                        onChange={handleFileChange}
                        className='form-control'
                      />
                      {formErrors.uploadIdProof && <small className='text-danger'>{formErrors.uploadIdProof}</small>}
                    </div>
                    <div className='col-12'>
                      <label htmlFor='' className='form-label'>
                        Vehicle No
                      </label>
                      <input
                        type='text'
                        name='vehicleNo'
                        className='form-control'
                        value={selectedDriver?.vehicleNo || ''}
                        onChange={handleChange}
                        required
                      />
                      {formErrors.vehicleNo && <small className='text-danger'>{formErrors.vehicleNo}</small>}
                    </div>
                  </div>
                </div>
                <div className='modal-footer'>
                  <button type='button' className='btn btn-danger' data-bs-dismiss='modal'>
                    Close
                  </button>
                  <button type='submit' className='btn btn-primary' disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDriver;
