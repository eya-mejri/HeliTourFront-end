import React from 'react'
import ImageWithBasePath from '../../core/common/imageWithBasePath'
import { Link } from 'react-router-dom'
import { all_routes } from '../router/all_routes';

const FaqFive = () => {

    const routes = all_routes
          //Testimonials Slider
  const TestimonialSider = {
    infinite: true, // Loop enabled
    speed: 2000, // Matches smartSpeed
    autoplay: false,
    dots: false,
    arrows: true,
    slidesToShow: 3, // For 1200px and above
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3.5, // Slick does not support fractional slides directly
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };    
  return (
    <>
    
    {/* FAQ */}
    <section className="section faq-secpath">
        <div className="bg-div">
            <ImageWithBasePath src="assets/img/bg/bg-03.png" className="bg-3" alt="img" />
        </div>
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    <div className="faq-five  aos" data-aos="fade-up">
                        <ImageWithBasePath src="http://127.0.0.1:3000/assets/img/images1-removebg-preview.png" alt="img" />
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="row justify-content-center">
                        <div className="col-xl-12  aos" data-aos="fade-up">
                            <div className="section-header mb-4">
                                <p className="mb-1">Frequently Asked Questions</p>
                                <h2>Specializing in dream destinations.</h2>
                            </div>
                        </div>
                    </div>
                    <div className="accordion accordion-flush faq-accordion-five" id="accordionFaq">
                        <div className="accordion-item show mb-3 aos " data-aos="fade-up" style={{visibility: 'visible', animationDelay: '0.2s', animationName: 'fadeInUp',}}>
                            <h2 className="accordion-header">
								<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapseOne"  aria-controls="faq-collapseOne">
									What types of tours do you offer?
								</button>
							</h2>
                            <div id="faq-collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFaq">
                                <div className="accordion-body">
                                    <p className="mb-0">We offer a wide range of helicopter tours, including scenic flights, adventure experiences, luxury escapes, and custom-designed aerial itineraries.</p>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item mb-3 aos" data-aos="fade-up" style={{visibility: 'visible', animationDelay: '0.4s', animationName: 'fadeInUp',}}>
                            <h2 className="accordion-header">
								 <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapsetwo"  aria-controls="faq-collapsetwo">
									Are the tours customizable?
							  </button>
							</h2>
                            <div id="faq-collapsetwo" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                <div className="accordion-body">
                                    <p>Yes, our tours are fully customizable! Clients can design their own unique helicopter experience by contacting us directly to discuss preferences, routes, and special requests.</p>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item mb-3  aos " data-aos="fade-up" style={{visibility: 'visible', animationDelay: '0.6s', animationName: 'fadeInUp',}}>
                            <h2 className="accordion-header">
								  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapsthree"  aria-controls="faq-collapsthree">
									What safety measures do you follow?
								  </button>
							</h2>
                            <div id="faq-collapsthree" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                <div className="accordion-body">
                                    <p>We adhere to strict aviation safety standards, with professionally trained pilots, regular helicopter maintenance, and comprehensive pre-flight checks to ensure a safe and comfortable experience for every passenger.</p>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item mb-3 aos "  style={{visibility: 'visible', animationDelay: '0.8s', animationName: 'fadeInUp',}}>
                            <h2 className="accordion-header">
								  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapsefour"  aria-controls="faq-collapsefour">
									How far in advance should I book?
								  </button>
							</h2>
                            <div id="faq-collapsefour" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                <div className="accordion-body">
                                    <p>We recommend booking your helicopter tour at least a few days in advance to ensure availability, especially during peak seasons or for customized itineraries.</p>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item aos "  style={{visibility: 'visible', animationDelay: '1s', animationName: 'fadeInUp',}}>
                            <h2 className="accordion-header">
								  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq-collapsefive"  aria-controls="faq-collapsefive">
									What is your cancellation policy?
								  </button>
							</h2>
                            <div id="faq-collapsefive" className="accordion-collapse collapse" data-bs-parent="#accordionFaq">
                                <div className="accordion-body">
                                    <p>Cancellations made at least 48 hours in advance are eligible for a full refund. For last-minute changes or weather-related issues, we offer flexible rescheduling options to accommodate our clients.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* /FAQ */}

    {/* Testimonial Section
    <section className="section testimonial-section bgwhite ">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-6 col-lg-10 text-center">
                    <div className="section-header text-center  aos " data-aos="fade-up">
                        <h2 className="mb-2">What’s Our <span className="text-primary  text-decoration-underline">User</span> Says</h2>
                        <p className="sub-title">Explore heartfelt stories from our satisfied travelers, showcasing unforgettable journeys and remarkable memories</p>
                    </div>
                </div>
            </div>
            <div className="owl-carousel testimonial-slider">
            <Slider  {...TestimonialSider}>
                {/* Testimonial Item*
                <div className="card border-white aos" >
                    <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between text-center flex-column">
                            <div className="rating d-flex align-items-center me-2 mb-3">
                                <i className="fa-solid fa-star filled  text-primary me-1 fs-14"></i>
                                <i className="fa-solid fa-star filled  text-primary me-1 fs-14"></i>
                                <i className="fa-solid fa-star filled  text-primary me-1 fs-14"></i>
                                <i className="fa-solid fa-star filled  text-primary me-1 fs-14"></i>
                                <i className="fa-solid fa-star filled  text-primary me-1 fs-14"></i>
                                <span className="text-gray-9 fs-14 ms-1">5.0</span>
                            </div>
                            <h6 className="mb-2">A Dream Vacation Come True!</h6>
                            <p className="mb-3">Dream Tours is the only way to go. We had the time of our life on our trip to the Ark. The customer service was wonderful, and the staff was very helpful.</p>
                            <div className="d-flex align-items-center">
                                <Link to="#" className="avatar avatar-md  flex-shrink-0">
                                    <ImageWithBasePath src="assets/img/users/user-01.jpg" className="rounded-circle" alt="img" />
                                </Link>
                                <div className="ms-2 d-flex align-items-center">
                                    <h6 className="fs-16 fw-medium"><Link to="#">Andrew</Link></h6>
                                    <span className="city-type">Newyork, United States</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /Testimonial Item*/}

                {/* Testimonial Item*
                <div className="card border-white aos " >
                    <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between text-center flex-column">
                            <div className="rating d-flex align-items-center me-2 mb-3">
                                <i className="fa-solid fa-star filled  text-primary me-1 fs-14"></i>
                                <i className="fa-solid fa-star filled  text-primary me-1 fs-14"></i>
                                <i className="fa-solid fa-star filled  text-primary me-1 fs-14"></i>
                                <i className="fa-solid fa-star filled  text-primary me-1 fs-14"></i>
                                <i className="fa-solid fa-star filled  text-primary me-1 fs-14"></i>
                                <span className="text-gray-9 fs-14 ms-1">5.0</span>
                            </div>
                            <h6 className="mb-2">Perfect Family Getaway!</h6>
                            <p className="mb-3">We had a fantastic time as a family. There were activities for every age group, and the kids loved the onboard kids’ club. The cruise gave us the perfect relaxation & fun.</p>
                            <div className="d-flex align-items-center">
                                <Link to="#" className="avatar avatar-md  flex-shrink-0">
                                    <ImageWithBasePath src="assets/img/users/user-02.jpg" className="rounded-circle" alt="img" />
                                </Link>
                                <div className="ms-2 d-flex align-items-center">
                                    <h6 className="fs-16 fw-medium"><Link to="#">Bryan</Link></h6>
                                    <span className="city-type">South Africa</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /Testimonial Item*/}

                {/* Testimonial Item*
                <div className="card border-white aos "data-aos="fade-up">
                    <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between flex-column">
                            <div className="rating d-flex align-items-center me-2 mb-3">
                                <i className="fa-solid fa-star filled  text-primary me-1"></i>
                                <i className="fa-solid fa-star filled  text-primary me-1"></i>
                                <i className="fa-solid fa-star filled  text-primary me-1"></i>
                                <i className="fa-solid fa-star filled  text-primary me-1"></i>
                                <i className="fa-solid fa-star filled  text-primary me-1"></i>
                                <span className="text-gray-9 fs-14">5.0</span>
                            </div>
                            <h6 className="mb-1">Amazing Food and Entertainment!</h6>
                            <p className="mb-3"> was blown away by the variety of dining options and live shows every night. It felt like I was in a five-star hotel on the sea! I’m already planning my next cruise</p>
                            <div className="d-flex align-items-center">
                                <Link to="#" className="avatar avatar-md  flex-shrink-0">
                                    <ImageWithBasePath src="assets/img/users/user-03.jpg" className="rounded-circle" alt="img" />
                                </Link>
                                <div className="ms-2 d-flex align-items-center">
                                    <h6 className="fs-16 fw-medium"><Link to="#">Prajakta</Link></h6>
                                    <span className="city-type">France</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {/* /Testimonial Item*/}

                {/* Testimonial Item*
                <div className="card border-white aos " data-aos="fade-up">
                    <div className="card-body">
                        <div className="d-flex align-items-center justify-content-between text-center flex-column">
                            <div className="rating d-flex align-items-center me-2 mb-3">
                                <i className="fa-solid fa-star filled  text-primary me-1 fs-14"></i>
                                <i className="fa-solid fa-star filled  text-primary me-1 fs-14"></i>
                                <i className="fa-solid fa-star filled  text-primary me-1 fs-14"></i>
                                <i className="fa-solid fa-star filled  text-primary me-1 fs-14"></i>
                                <i className="fa-solid fa-star filled  text-primary me-1 fs-14"></i>
                                <span className="text-gray-9 fs-14 ms-1">5.0</span>
                            </div>
                            <h6 className="mb-2">Perfect Family Getaway!</h6>
                            <p className="mb-3">We had a fantastic time as a family. There were activities for every age group, and the kids loved the onboard kids’ club. The cruise gave us the perfect relaxation & fun.</p>
                            <div className="d-flex align-items-center">
                                <Link to="#" className="avatar avatar-md  flex-shrink-0">
                                    <ImageWithBasePath src="assets/img/users/user-02.jpg" className="rounded-circle" alt="img" />
                                </Link>
                                <div className="ms-2 d-flex align-items-center">
                                    <h6 className="fs-16 fw-medium"><Link to="#">Bryan</Link></h6>
                                    <span className="city-type">South Africa</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* /Testimonial Item*
            </Slider>


            </div>
        </div>
    </section>
     /Testimonial Section */}

    {/* Get-in-touch */}
    <section className="section getintouch pt-0 mt-5">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="getintouch-div bg-dark aos" data-aos="fade-up">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="getintouch-content pe-0">
                                    <h2 className="text-white mb-2">Ready to Fly? Get in Touch!</h2>
                                    <p className="text-light mb-4">Have questions about routes, flight experiences, or custom tour options? Our team is here to help you plan the perfect aerial adventure. Reach out and let’s make your helicopter tour unforgettable!</p>
                                    <Link to="/pages/contact-us" className="btn btn-white">Contact Us<i className="isax isax-arrow-right-3 ms-2"></i></Link>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="getintouch-img">
                                    <ImageWithBasePath src="http://127.0.0.1:3000/assets/img/imagegetintouch.avif" alt="img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* Get-in-touch */}
    
    </>
  )
}

export default FaqFive