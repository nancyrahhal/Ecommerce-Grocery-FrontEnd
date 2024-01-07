import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import arrow icons from react-icons/fa

import './Carousel.css'; // Import the CSS file
import Photo1 from '../../assets/Grocery1.jpg'
import Photo2 from '../../assets/Grocery2.jpg'
import Photo3 from  '../../assets/Grocery3.jpg'
import Photo4 from  '../../assets/Grocery4.jpg'


const ImageCarousel = () => {
  const images = [
    `${Photo1}`,
    `${Photo2}`,
    `${Photo3}`,
    `${Photo4}`
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    console.log('Next slide clicked');
    setCurrentIndex((currentIndex + 1) % images.length);
  };
  
  const goToPrevSlide = () => {
    console.log('Previous slide clicked');
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleSeeAll = () => {
    window.location.href = '/offers';
    console.log('See All clicked');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="image-carousel">
      <button className="see-all-button" onClick={handleSeeAll}>See All</button>
      <button className="carousel-button left-button" onClick={goToPrevSlide}>
        <FaChevronLeft />
      </button>
      <div
        className="carousel-image"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
        alt={`Slide ${currentIndex + 1}`}
      />
      <button className="carousel-button right-button" onClick={goToNextSlide}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ImageCarousel;