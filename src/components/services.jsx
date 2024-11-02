import React from 'react'
import service_1 from '../assets/service-1.jpg'
import service_2 from '../assets/services-2.jpg'
import service_3 from '../assets/service-3.jpg'


export default function Services() {
    return (
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
    )
}
