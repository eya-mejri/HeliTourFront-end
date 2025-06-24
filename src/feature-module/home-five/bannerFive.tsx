import React, { useEffect, useState } from 'react'
import { DatePicker, message } from 'antd'
import { Form, Link, useNavigate } from 'react-router-dom'
import dayjs from "dayjs"
import AOS from 'aos'
import 'aos/dist/aos.css'

import axios from 'axios'
import BannerCounter from './BannerCounter'
import FormSearch from './FormSearch'



const BannerFive = () => {

    return (
        <section className="hero-section-five" style={{
            backgroundImage: "url(http://127.0.0.1:3000/assets/img/Heli11.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
            zIndex: 1,
            padding: "100px 0 140px"
        }}>
            <div className="container">
                <div className="hero-content">
                    <div className="row align-items-center">
                        <div className="col-md-12 mx-auto">
                            <div className="banner-content aos" data-aos="fade-up">
                                <h1 className="text-white display-5">Discover the World's Most Breathtaking Tours</h1>
                                <h6 className="text-white mx-auto">Explore stunning destinations and amazing experiences with Helitour Tunisia</h6>
                            </div>
                            <FormSearch/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BannerFive