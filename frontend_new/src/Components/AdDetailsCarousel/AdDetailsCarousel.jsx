import * as React from "react";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './AdDetailsCarousel.css'

export default function MyCarousel() {
    const images = [
        {
            url: require('./Images/book.jpg'),
            alt: 'Első kép'
        },
        {
            url: require('./Images/chair.jpg'),
            alt: 'Második kép'
        },
        {
            url: require('./Images/desk.jpg'),
            alt: 'Harmadik kép'
        },
        {
            url: require('./Images/pen.jpg'),
            alt: 'Negyedik kép'
        },
        {
            url: require('./Images/pencil.png'),
            alt: 'Ötödik kép'
        }
    ]

    return(
        <div className="carousel">
            <Carousel showThumbs={false} showStatus={false} className="rounded-full" showIndicators={true} showArrows={true} infiniteLoop={true} autoPlay={false}>
                 {
                    images.map((image, index) => (
                        <div key={index}>
                            <img loading="lazy" src={image.url} className="img" />
                        </div>
                    ))
                }
            </Carousel>
        </div>
    )
}