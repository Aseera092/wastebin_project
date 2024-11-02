import React, { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; // Optional, for adding your custom styles
import axios from 'axios'; // Assuming you're using axios for API calls
import { userLogin } from "../services/userLogin";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLoginAPI } from "../services/user";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()


    useEffect(() => {
        if (localStorage.getItem('adminLogin')) {
            navigate('/dashboard');
        } else if (localStorage.getItem('userLogin')) {
            navigate('/user');
        }
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {

            userLoginAPI({
                username: email,
                password: password
            }).then((res) => {
                if (res.status) {
                    toast.success("Login Successful!");
                    // Example: Redirect to admin dashboard
                    if (res.isAdmin) {
                        navigate('/dashboard')
                        localStorage.setItem("adminLogin", "true")
                    } else {
                        navigate('/')
                        localStorage.setItem("userLogin", "true")
                        console.log(res.data);
                        localStorage.setItem("userId", `${res.data._id}`)
                    }
                } else {
                    toast.error(res.message || "Login failed!");
                }
            }).catch((error) => {
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

        <div className="login-container">
            <h2>Sign in</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;  