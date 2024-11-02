import React, { useState } from 'react'
import { useEffect } from 'react'
import { deleteMachine, getMachine, updateMachine } from '../services/machine'
import { toast } from 'react-toastify'
import { getRequest, updateRequestStatus } from '../services/user'



const ViewallRequest = () => {

    const [requests, setrequests] = useState([])
    const [selectedRequest, setSelectedRequest] = useState()


    const init = () => {
        getRequest().then((res) => {

            setrequests(res.data)
        })
    }

    useEffect(() => {
        init()
    }, [])


    const submitAction = (e) => {
        e.preventDefault()
        const message = document.getElementById("message")
        const data = {
            status: "Rejected",
            rejectMessage: message.value
        }
        updateStatus(selectedRequest._id,data)

        document.getElementById('modal-close').click();
    }

    const updateStatus = (id,data) =>{
        updateRequestStatus(id,data).then((res)=>{
            if (res.status) {
                toast.success("successfuly updated")
                init()
            }else{
                toast.error("error:"+res.message)
            }
        })
    }

    return (
        <div className='container'>
            <h2>Request</h2>
            <div className='table-container p-3 px-5 shadow p-3 mt-2 bg-white rounded '>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Sl No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Latitude</th>
                            <th scope="col">Longitude</th>
                            <th scope="col">Request Date</th>
                            <th scope="col">collect Date</th>

                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            requests.map((data, ind) => {
                                return (
                                    <tr>
                                        <th scope="row">{ind + 1}</th>
                                        <td>{`${data.users.firstName} ${data.users.lastName}`}</td>
                                        <td>{data.users.mobileNo}</td>
                                        <td>{data.latitude}</td>
                                        <td>{data.longitude}</td>
                                        <td>
                                            {new Date(data.createdAt).toLocaleString('en-US', {
                                                year: 'numeric',
                                                month: 'numeric',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                second: 'numeric',
                                                hour12: false
                                            })}
                                        </td>
                                        <td>
                                            {new Date(data.collectDate).toLocaleString('en-US', {
                                                year: 'numeric',
                                                month: 'numeric',
                                                day: 'numeric',

                                            })}
                                        </td>
                                        <td title={data.rejectMessage && data.rejectMessage}><span class={data.status == "Approved" || data.status == "Collected"  ? `badge bg-success` : data.status == "Pending" ? `badge bg-warning` : `badge bg-danger user-select-none`}>
                                            {data.status}</span></td>
                                        <td>
                                            <div className='d-flex'>
                                                <button className='btn btn-primary me-2' onClick={()=>{window.open(`https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`,'_blank')}}>Location</button>
                                                {data.status === "Pending" && <div className='d-flex'>
                                                    <button className='btn btn-success me-2' onClick={()=>{updateStatus(data._id,{status:'Approved'})}}>Approve</button>
                                                    <button className='btn btn-danger' data-bs-toggle="modal" data-bs-target="#editmodal" onClick={()=>{setSelectedRequest(data)}}>Reject</button>
                                                </div>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
                <div class="modal fade" id="editmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <form onSubmit={submitAction}>
                                <div class="modal-header justify-content-between">
                                    <h5 class="modal-title" id="exampleModalLongTitle">Reject Reason </h5>
                                    <button type="button" id="modal-close" class="btn text-danger" data-bs-dismiss="modal" aria-label="Close">
                                        <i class="bi bi-x-circle"></i>
                                    </button>
                                </div>
                                <div class="modal-body">

                                    <div className="row g-2">
                                        <div className="col col-12 col-sm-12 col-md-12">
                                            <label htmlFor="" className="form-label">Message</label>
                                            <input type="text" className="form-control" id='message' placeholder='Reson for Reject' required />
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" class="btn btn-primary">Reject</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewallRequest