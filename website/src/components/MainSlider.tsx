import React, { FC } from 'react';
import img1 from "../assets/images/Reel-Martini/img_1_thor.png";
import img2 from "../assets/images/Reel-Martini/img_2_aquaman.png";
import img3 from "../assets/images/Reel-Martini/img_3.png";

type Props = {
    title?: string,
}
const MainSlider: FC<Props> = ({ title }) => {
    const data = [
        {
            poster: img1,
            name: 'Thor',
            description: '2022 -English - Action'
        },
        {
            poster: img2,
            name: 'Aquaman',
            description: '2022 -English - Action'
        },
        {
            poster: img3,
            name: 'Heropanti 2',
            description: '2022 -Hindi - Action'
        },
        {
            poster: img1,
            name: 'Thor',
            description: '2022 -English - Action'
        },
        {
            poster: img2,
            name: 'Aquaman',
            description: '2022 -English - Action'
        },
        {
            poster: img3,
            name: 'Heropanti 2',
            description: '2022 -Hindi - Action'
        },
        
    ]
    return (

        <section id="testimonial" className="movie-banner">
            <div className="container-fluid container-padding">
                <div className="row">
                    <div className="swiper-container" id="movie-slider">
                        <div className="swiper-wrapper">
                            {
                                data && data.map((item, index) => {
                                    return (
                                        <div className="swiper-slide" key={`main-slider-${index}`}>
                                            <div className="movie-card movie-card-banner ">
                                                <img src={item.poster} alt=""
                                                    className="w-550 img-fluid" />
                                                <div className="banner-hover">
                                                    <h3>{item.name}</h3>
                                                    <h5>{item.description}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="sectional-padding"></div>
                        <div className="swiper-pagination"></div>
                    </div>
                </div>
            </div>
            <div className="sectional-padding"></div>
        </section>
    )
}


export default MainSlider  