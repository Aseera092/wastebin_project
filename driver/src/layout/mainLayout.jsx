import React, { useEffect } from 'react'
import Navbar from './navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import MapView from '../components/mapView'
import { toast } from 'react-toastify'

export default function MainLayout() {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('driverLogin')) {
            toast.error("please login")
            navigate('/');
        }
    }, [])
    return (
        <main style={{
            position: 'relative'
        }}>
            <Navbar />
            <MapView />
            <div style={{
                position: 'absolute',
                top: '10vh',
                height: '90vh',
                width: '100%'
            }}>
                <Outlet />
            </div>
        </main>
    )
}
