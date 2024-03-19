import * as React from "react";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './AdDetailsCarousel.css'

export default function MyCarousel() {
    const images = [
        {
            url: require('./Images/1.jfif'),
            alt: 'Első kép'
        },
        {
            url: require('./Images/2.jfif'),
            alt: 'Második kép'
        },
        {
            url: require('./Images/3.jfif'),
            alt: 'Harmadik kép'
        },
        {
            url: require('./Images/4.jfif'),
            alt: 'Negyedik kép'
        },
        {
            url: require('./Images/5.jfif'),
            alt: 'Ötödik kép'
        },
        {
            url: require('./Images/6.jfif'),
            alt: 'Hatodik kép'
        }
    ]

    return(
        <div className="carousel">
            <Carousel showThumbs={false} showStatus={false} showIndicators={true} showArrows={true} infiniteLoop={true} autoPlay={false} >
                 {
                    images.map((image, index) => (
                        <div key={index}>
                            <img loading="lazy" alt={image.alt} src={image.url} className="carousel-img" />
                        </div>
                    ))
                }
            </Carousel>
        </div>
    )
}