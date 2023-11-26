import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'
import { FaQuoteLeft } from "react-icons/fa";

import { Pagination } from 'swiper/modules';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios('Testimonials.json')
            .then(res => {
                setReviews(res.data)
            })
    }, [])
    return (
        <div>
            <div className="text-center py-10 mt-10">
                <h2 className="text-5xl py-5 text-orange-400 font-bold">TESTIMONIALS</h2>
                <hr className="border-2 border-orange-400 mb-5 max-w-xs mx-auto" />
                <p> Read on to discover how we are making a difference in the lives and businesses of those we serve.</p>
            </div>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    // when window width is >= 640px
                    640: {
                        slidesPerView: 2
                    },
                    1100: {
                        slidesPerView: 3
                    }
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                {
                    reviews.map((review, idx) => <SwiperSlide key={idx}>
                        <div className="card w-96 bg-base-100 shadow-xl mb-10">
                            <div>
                                <img src={review.avatarUrl} alt="Review" className="w-1/3 mx-auto  rounded-full" />
                            </div>
                            <div className="card-body items-center text-center">
                                <div>
                                    <FaQuoteLeft />
                                    <p>{review.testimonialText}</p>
                                </div>
                            </div>
                            <div className="text-center pb-5">
                                <h3 className="text-3xl font-medium pb-3">{review.name}</h3>
                                <h5 className="text-xl font-normal">{review.designation}</h5>
                            </div>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Testimonials;