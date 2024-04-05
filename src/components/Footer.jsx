import React from 'react'
import { Link } from 'react-router-dom';
import "../assets/styles/homestyles.css";

function Footer() {
    return (
        <div>
            <footer className="text-center text-lg-start bg-black text-muted" id="contactus">
                {/* Section: Social media */}
                <section className="bg-black text-white d-flex justify-content-center justify-content-lg-between p-4 border-bottom" style={{ marginBottom: '1px' }}>
                    {/* Left */}
                    <div className="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    {/* Left */}

                    {/* Right */}
                    <div style={{ paddingRight: '150px' }}>
                        <Link to="" className="me-4 text-reset">
                            <i className="fab fa-facebook-f"></i>
                        </Link>
                        <Link to="" className="me-4 text-reset">
                            <i className="fab fa-twitter"></i>
                        </Link>
                        <Link to="" className="me-4 text-reset">
                            <i className="fab fa-google"></i>
                        </Link>
                        <Link to="" className="me-4 text-reset">
                            <i className="fab fa-instagram"></i>
                        </Link>
                        <Link to="" className="me-4 text-reset">
                            <i className="fab fa-linkedin"></i>
                        </Link>
                    </div>
                    {/* Right */}
                </section>
                {/* Section: Social media */}

                {/* Section: Links */}
                <section className='bg-black text-white'>
                    <div className="container text-center text-md-start" style={{ maxWidth: '1600px', height: '300px' }}>
                        {/* Grid row */}
                        <div className="row mt-3">
                            {/* Grid column */}
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                {/* Content */}
                                <h4 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3"></i>NrityaSahachara
                                </h4>
                                <p>
                                    Our Platform is an attempt to permanently preserve the rich art and cultural heritage of India. Our dream is to provide 24/7 online access to personalized lectures, tutorials, classes, and performances of all Indian art and culture.
                                </p>
                            </div>
                            {/* Grid column */}

                            {/* Grid column */}
                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 hov">
                                {/* Links */}
                                <h6 className="text-uppercase fw-bold mb-4">
                                    contents
                                </h6>
                                <p>
                                    <Link to="/Home" className="text-reset">Home</Link>
                                </p>
                                <p>
                                    <Link to="/Classes" className="text-reset">classes</Link>
                                </p>
                                <p>
                                    <Link to="/Auditions" className="text-reset">Auditions</Link>
                                </p>
                                <p>
                                    <Link to="/Events" className="text-reset">events</Link>
                                </p>
                            </div>
                            {/* Grid column */}

                            {/* Grid column */}
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 hov">
                                {/* Links */}
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <br />
                                </h6>
                                <p>
                                    <Link to="/PrivacyPolicies" className="text-reset">Privacy & policies</Link>
                                </p>
                                <p>
                                    <Link to="/Settings" className="text-reset">Settings</Link>
                                </p>
                                <p>
                                    <Link to="/Feedback" className="text-reset">feedback</Link>
                                </p>
                                <p>
                                    <Link to="/Help" className="text-reset">Help</Link>
                                </p>
                            </div>
                            {/* Grid column */}

                            {/* Grid column */}
                            <div className="col-md-4 cwhite-3 col-xl-3 mx-auto mb-md-0 mb-4 hov">
                                {/* Links */}
                                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                <p><i className="fas fa-home me-3"></i> Andhra Pradesh, India</p>
                                <p>
                                    <i className="fas fa-envelope me-3"></i>
                                    nrityasahachara.com
                                </p>
                                <p><i className="fas fa-phone me-3"></i> +91 1234567890</p>
                                <p><i className="fas fa-print me-3"></i> +91 1234567890</p>
                            </div>
                            {/* Grid column */}
                        </div>
                        {/* Grid row */}
                    </div>
                </section>
                {/* Section: Links */}

                {/* Copyright */}
                <div className="text-center p-2 bg-dark" style={{ color: 'white' }}>
                    © 2024 Copyright:
                    <Link className="text-reset fw-bold" to="">NrityaSahachara.com</Link>
                </div>
                {/* Copyright */}
            </footer>
        </div>
    )
}

export default Footer
