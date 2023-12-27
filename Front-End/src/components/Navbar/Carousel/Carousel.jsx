import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import arrow icons from react-icons/fa

import './Carousel.css'; // Import the CSS file

const ImageCarousel = () => {
  const images = [
    'https://influencedigest.com/wp-content/uploads/2023/01/What-Makes-Grocery-Store-Advertising-More-Effective.jpg',
    'https://mustsharenews.com/wp-content/uploads/2023/02/feature-image-1-32.jpg',
    'https://thumbs.dreamstime.com/z/grocery-shopping-promotional-sale-banner-fast-shopping-cart-full-fresh-colorful-food-grocery-shopping-promotional-sale-banner-168812786.jpg',
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
    }, 2500);
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
