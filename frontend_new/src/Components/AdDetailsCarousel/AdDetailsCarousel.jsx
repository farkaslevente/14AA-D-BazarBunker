import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const AdDetailsCarousel = ({ imageUrls }) => {
  return (
    <div className="carousel-container">
      <div className="carousel">
        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={true}
          showArrows={true}
          infiniteLoop={true}
          autoPlay={false}
        >
          {imageUrls.map((imageUrl, index) => (
            <div key={index} className="carousel-slide">
              <img
                loading="lazy"
                alt={`Image ${index}`}
                src={imageUrl}
                className="carousel-img"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default AdDetailsCarousel;
