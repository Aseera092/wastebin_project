import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AddRequestAPI, getRequestbyId } from '../services/user';

export default function UserRequest() {
    const navigate = useNavigate()
    const [requests, setRequests] = useState([])
    const [rejectionReason, setRejectionReason] = useState("")
    const [requestdata, setRequestData] = useState({
        wasteType: "",
        collectDate: "",
    })

    const [currentLocation, setCurrentLocation] = useState()

    useEffect(() => {
        if (!localStorage.getItem('userLogin')) {
            toast.error("Please Sign in")
            navigate('/login');
        }
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setCurrentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        } else {
            console.error("Geolocation is not available in your browser.");
        }
        init()

    }, [])

    const init = () => {
        getRequestbyId(localStorage.getItem('userId')).then((res) => {
            if (res.status) {
                setRequests(res.data)
            }
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRequestData({
            ...requestdata,
            [name]: value,
        });
    };

    const submitHandle = (e) => {
        e.preventDefault()
        if (!currentLocation) {
            toast.error('Current Location is not get. please add permission or try again')
        }

        AddRequestAPI({ ...requestdata, ...currentLocation, users: localStorage.getItem("userId") }).then((res) => {
            if (res.status) {
                toast.success(res.message)
            } else {
                toast.success(`${res.message} ${res.error}`)
            }
            init()
        })
    }

    return (
        <div>
            <div class="container py-5">
                <div class="row gap-4 justify-content-center">
                    <div class="card col-lg-4 p-3">
                        <h3>Waste Collection Request Form</h3>
                        <form id="waste-collection-form" onSubmit={submitHandle}>
                            <div class="mb-3">
                                <label for="waste-type" class="form-label">Type of Waste</label>
                                <select class="form-select" name="wasteType" value={requestdata.wasteType} onChange={handleChange} required>
                                    <option value="">Choose...</option>
                                    <option value="General Waste">General Waste</option>
                                    <option value="Recyclable Waste">Recyclable Waste</option>
                                    <option value="Hazardous Waste">Hazardous Waste</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="date" class="form-label">Preferred Collection Date</label>
                                <input type="date" class="form-control" name="collectDate" value={requestdata.collectDate} onChange={handleChange} required />
                            </div>
                            <button type="submit" class="btn btn-success">Submit Request</button>
                        </form>
                    </div>

                    <div class="card col-lg-7 p-3">
                        <h3>Submitted Requests</h3>
                        <div className='table-responsive-lg'>
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Waste Type</th>
                                        <th>Request Date</th>
                                        <th>Collection Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody id="request-list">
                                    {
                                        requests.map((dt, ind) => {
                                            return (
                                                <tr>
                                                    <td>{ind + 1}</td>
                                                    <td>{dt.wasteType}</td>
                                                    <td>
                                                    {new Date(dt.createdAt).toLocaleString('en-US', {
                                                        year: 'numeric',
                                                        month: 'numeric',
                                                        day: 'numeric'
                                                    })}
                                                    </td>
                                                    <td>{new Date(dt.collectDate).toLocaleString('en-US', {
                                                        year: 'numeric',
                                                        month: 'numeric',
                                                        day: 'numeric'
                                                    })}</td>
                                                    <td>{dt.status === "Rejected" ?
                                                        <button className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#messageModal" onClick={() => {
                                                            setRejectionReason(dt.rejectMessage)
                                                        }}>
                                                            {dt.status}
                                                        </button> : dt.status}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="messageModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Reason for rejection</h5>
                        </div>
                        <div class="modal-body">
                            <p>{rejectionReason}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
