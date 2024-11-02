import React from 'react'

export default function About() {
    return (
        <section class="about py-5 d-flex" style={{ height: '100vh' }}>
            <div class="container" >
                <h1 class="text-center mb-4">About Us</h1>
                <p class="text-center">At WasteManage, we are committed to providing sustainable waste management solutions that protect the environment and benefit communities.</p>
                <div class="row gap-4 justify-content-center">
                    <div class="card col-md-5 p-3">
                        <h3>Our Mission</h3>
                        <p>To reduce waste and promote recycling initiatives that ensure a cleaner, greener future.</p>
                    </div>
                    <div class="card col-md-5 p-3">
                        <h3>Our Values</h3>
                        <p>We are dedicated to providing eco-friendly, reliable, and efficient services while maintaining our commitment to sustainability and customer satisfaction.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
