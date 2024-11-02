import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { driverLoginAPI } from '../services/driver';
import { toast } from 'react-toastify';

export default function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate()
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
           
            driverLoginAPI({
            username:email,
            password:password
           }).then((res)=>{
            if (res.status) {
                toast.success("Login Successful!");
                // Example: Redirect to admin dashboard
                if (res.status) {
                   navigate('/main')
                   localStorage.setItem("driverLogin","true")
                }
            } else {
                toast.error(res.message || "Login failed!");
            }
           }).catch ((error)=> {
                toast.error("An error occurred while logging in.");
            })
        }
    };

    const validateForm = () => {
        if (!email || !password) {
            toast.error("Please enter all fields!");
            return false;
        }
        // Simple email validation
        const emailPattern = /\S+@\S+\.\S+/;
        if (!emailPattern.test(email)) {
            toast.error("Please enter a valid email!");
            return false;
        }
        return true;
    };


    return (
        <div className="row text-center justify-content-center align-items-center" style={{height:'100vh'}}>
            <div className="col-md-6 ">
                <div className="card">
                    <div className="card-body">
                        <div className="login-img">
                            <img src="https://cdn-icons-png.flaticon.com/512/295/295128.png" height={'100px'} width={'100px'}/>
                        </div>
                        <div className="login-title">
                            <h4>Driver Log In</h4>
                        </div>
                        <div className="login-form mt-4">
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <input id="email" name="email" placeholder="Enter email" className="form-control" type="text" onChange={(e)=>{setEmail(e.target.value)}} />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <input type="password" className="form-control" id="pass" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <button type="submit" className="btn btn-danger btn-block">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
