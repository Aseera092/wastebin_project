import React, { useEffect } from 'react'
import Login from '../components/login'
import { useNavigate } from 'react-router-dom';

export default function LoginLayout() {
  const navigate = useNavigate()
  useEffect(() => {
    if(localStorage.getItem('driverLogin')){
      navigate('/main');
    }
  }, [])
  return (
    <div className="container">
        <Login />
    </div>
  )
}
