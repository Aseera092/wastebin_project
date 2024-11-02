import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()
    return (
        <nav className="navbar navbar-expand-lg bg-white shadow p-3 justify-content-between" style={{position:'relative',zIndex:1000}}>
            <a className="navbar-brand font-weight-bold text-dark" href="#">Waste Collecting System</a>
            <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fa fa-2x fa-user-circle"></i> </a>
            <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#">My account</a>
                <button className="dropdown-item" onClick={()=>{localStorage.clear(); navigate('/')}} >Log out</button>
            </div>
        </nav>
    )
}
