import React from 'react'

const SectionBenefit = () => {
  return (
    <>
  {/* Benefit Section */}
  <section className="section benefit-section bg-light-300">
    <div className="container">
      <div className="row justify-content-center">
        <div
          className="col-lg-6 text-center aos"
         data-aos="fade-up"
        >
          <div className="section-header text-center">
            <h2 className="mb-2">
              Our{" "}
              <span className="text-primary  text-decoration-underline">
                Benefits
              </span>{" "}
              &amp; Key Advantages
            </h2>
            <p className="sub-title">
              DreamsTour, a tour operator specializing in dream destinations,
              offers a variety of benefits for travelers.
            </p>
          </div>
        </div>
      </div>
      <div className="row g-4">
        <div className="col-sm-6 col-lg-3 d-flex">
          <div
            className="card benefit-card mb-0 flex-fill aos"
           data-aos="fade-up"
          >
            <div className="card-body text-center">
              <div className="benefit-icon mb-2 bg-secondary text-gray-9 mx-auto">
                <i className="isax isax-lock-1" />
              </div>
              <h5 className="mb-2">VIP Packages</h5>
              <p className="mb-0">
                Include premium seating, meet-and-greet experiences, backstage
                tours.
              </p>
              <span className="icon-view text-secondary">
                <i className="isax isax-lock-1" />
              </span>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3 d-flex">
          <div
            className="card benefit-card mb-0 flex-fill aos"
           data-aos="fade-up"
          >
            <div className="card-body text-center">
              <div className="benefit-icon mb-2 bg-orange text-white mx-auto">
                <i className="isax isax-magicpen" />
              </div>
              <h5 className="mb-2">Concert Tickets</h5>
              <p className="mb-0">
                A centralized place to buy tickets for various dates of the tour
              </p>
              <span className="icon-view text-orange">
                <i className="isax isax-magicpen" />
              </span>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3 d-flex">
          <div
            className="card benefit-card mb-0 flex-fill aos"
            data-aos="fade-up"
          >
            <div className="card-body text-center">
              <div className="benefit-icon mb-2 bg-purple text-white mx-auto">
                <i className="isax isax-receipt-add" />
              </div>
              <h5 className="mb-2">Travel Packages</h5>
              <p className="mb-0">
                Bundles that include concert tickets, accommodations
              </p>
              <span className="icon-view text-purple">
                <i className="isax isax-receipt-add" />
              </span>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3 d-flex">
          <div
            className="card benefit-card mb-0 flex-fill aos"
            data-aos="fade-up"
          >
            <div className="card-body text-center">
              <div className="benefit-icon mb-2 bg-teal text-white mx-auto">
                <i className="isax isax-location-tick" />
              </div>
              <h5 className="mb-2">Best Price Guarantee</h5>
              <p className="mb-0">
                Such as private rehearsals, soundcheck access,
              </p>
              <span className="icon-view text-teal">
                <i className="isax isax-location-tick" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* /Benefit Section */}
</>

  )
}

export default SectionBenefit