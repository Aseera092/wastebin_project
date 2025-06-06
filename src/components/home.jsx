import React from 'react'
import background from '../assets/home-bg.png'
import service_1 from '../assets/service-1.jpg'
import service_2 from '../assets/services-2.jpg'
import service_3 from '../assets/service-3.jpg'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <section class="hero bg-success text-white text-center p-5 d-flex justify-content-center align-items-center" 
            style={{height:'100vh',backgroundImage:`url('${background}')`,backgroundSize:'cover',backgroundPosition:'50% 50%'}}>
                <div class="container ">
                    <h1 class="display-3 fw-medium text-shadow-5">Sustainable Waste Management Solutions</h1>
                    <p class="lead fw-medium text-shadow-3">Efficient, eco-friendly solutions for managing waste and recycling.</p>
                    <Link to="/signup" class="btn btn-success btn-lg">Get Started</Link>
                </div>
            </section>

            <section class="services py-5">
            <div class="container">
                <h1 class="text-center mb-4">Our Services</h1>
                <div class="row">

                    <div class="col-md-4">
                        <div class="card mb-4">
                            <img src={`${service_1}`} class="card-img-top" alt="Recycling" />
                            <div class="card-body">
                                <h5 class="card-title">Recycling</h5>
                                <p class="card-text">We provide comprehensive recycling services to reduce waste and promote sustainability.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="card mb-4">
                            <img src={`${service_2}`} class="card-img-top" alt="Waste Collection" />
                            <div class="card-body">
                                <h5 class="card-title">Waste Collection</h5>
                                <p class="card-text">Reliable and scheduled waste collection for residential and commercial clients.</p>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="card mb-4">
                            <img src={`${service_3}`} class="card-img-top" alt="Sustainability Solutions" />
                            <div class="card-body">
                                <h5 class="card-title">Sustainability Solutions</h5>
                                <p class="card-text">Customized solutions for managing waste and resources in an eco-friendly way.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
}
