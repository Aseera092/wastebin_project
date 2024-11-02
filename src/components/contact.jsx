import React from 'react'

export default function Contact() {
    return (
        <section class="contact py-5">
            <div class="container">
                <h1 class="text-center mb-4">Contact Us</h1>
                <div class="row">
                    <div class="col-md-6">
                        <h4>Get In Touch</h4>
                        <form>
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" class="form-control" id="name" placeholder="Your Name" />
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" placeholder="name@example.com" />
                            </div>
                            <div class="mb-3">
                                <label for="message" class="form-label">Message</label>
                                <textarea class="form-control" id="message" rows="3" placeholder="Your message"></textarea>
                            </div>
                            <button type="submit" class="btn btn-success">Send Message</button>
                        </form>
                    </div>
                    <div class="col-md-6">
                        <h4>Contact Details</h4>
                        <p><strong>Address:</strong> Angamaly,Ernakulam</p>
                        <p><strong>Email:</strong> info@wastemanage.com</p>
                        <p><strong>Phone:</strong> +123 456 7890</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
