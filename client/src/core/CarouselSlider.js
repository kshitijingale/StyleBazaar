import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


const CarouselSlider = () => {
  return (
    <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} interval={5000}>
      <div className='flex h-[600px] items-center justify-center overflow-hidden	'>
        <img className='object-cover w-[100%] h-[100%]' src={require("../assets/images/promotional-banner-1.png")} alt="Slide 1" />
      </div>
      <div className='flex h-[600px] items-center justify-center overflow-hidden	'>
        <img className='object-cover w-[100%] h-[100%]' src={require("../assets/images/promotional-banner-2.png")} alt="Slide 2" />
      </div>
      <div className='flex h-[600px] items-center justify-center overflow-hidden	'>
        <img className='object-cover w-[100%] h-[100%]' src={require("../assets/images/promotional-banner-3.png")} alt="Slide 3" />
      </div>
    </Carousel>
  );
};

export default CarouselSlider;
