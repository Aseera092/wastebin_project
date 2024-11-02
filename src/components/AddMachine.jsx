import React, { useEffect, useState } from 'react';
import { addMachine } from '../services/machine';
import { toast } from 'react-toastify';

import MapPicker from 'react-google-map-picker'

const submitAction = async (e) => {
  e.preventDefault();

  const machineid = document.getElementById("machineId");
  const latitude = document.getElementById("latitude");
  const longitude = document.getElementById("longitude");
  const landmark = document.getElementById("landmark");


  const data = {
    machineId: machineid.value,
    landmark: landmark.value,
    latitude: latitude.value,
    longitude: longitude.value,
  };


  try {
    const res = await addMachine(data);
    if (res.status) {
      toast.success("Successfully added");
      machineid.value = "";
      latitude.value = "";
      longitude.value = "";
      landmark.value = ""
    } else {
      toast.error(res.error || "Failed to add machine. Please try again.");
    }
  } catch (error) {
    toast.error("An error occurred while adding the machine.");
  }
};
const DefaultLocation = {
  lat: 10.231688,
  lng: 76.4183711
};

const DefaultZoom = 15;

const AddMachine = () => {

  const [location, setLocation] = useState(DefaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);


  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.error("Geolocation is not available in your browser.");
    }
  }, [])


  function handleChangeLocation(lat, lng) {
    setLocation({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  return (
    <div className="container">
      <h2>Add Machine</h2>
      <form onSubmit={submitAction}>
        <div className="row g-2 px-5 shadow p-3 mt-2 bg-white rounded">
          <div className="col col-12 col-sm-12 col-md-6">
            <label htmlFor="machineId" className="form-label">Machine Id</label>
            <input type="text" className="form-control" id='machineId' placeholder='Enter Machine ID' required />
          </div>
          <div className="col col-12 col-sm-12 col-md-6">
            <label htmlFor="landmark" className="form-label">Land Mark</label>
            <input type="text" className="form-control" id='landmark' placeholder='Enter landmark' required />
          </div>
          <div className="col col-12 col-sm-12 col-md-6">
            <label htmlFor="latitude" className="form-label">Latitude</label>
            <input type="text" className="form-control" id='latitude' value={location?.lat} placeholder='Enter Latitude' required />
          </div>
          <div className="col col-12 col-sm-12 col-md-6">
            <label htmlFor="longitude" className="form-label">Longitude</label>
            <input type="text" className="form-control" id='longitude' value={location?.lng} placeholder='Enter Longitude' required />
          </div>

          <MapPicker
            defaultLocation={location}
            zoom={zoom}
            mapTypeId="roadmap"
            style={{ height: '300px' }}
            onChangeLocation={handleChangeLocation}
            onChangeZoom={handleChangeZoom}
            apiKey='AIzaSyB_D6SgHRz8T6y2fPiVtAS4uYq0eUfkBUQ' />

          <div className="col col-12 col-sm-12 col-md-12 mt-3">
            <div className='d-flex gap-2 w-25 justify-content-end'>
              <button type="submit" className="btn btn-success w-100">Add Machine</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMachine;
