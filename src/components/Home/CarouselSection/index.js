import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel, CarouselItem } from 'react-bootstrap';
import { CarouselImg } from './CarouselElements';
import 'bootstrap/dist/css/bootstrap.css';
import { dataServer } from '../../DataServer';

const CarouselSection = () => {
  const [sliderItems, setSliderItems] = useState([]);
  const isMobile = useCheckIsMobile();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${dataServer.href}/api/v1/slider?status=true`);
        setSliderItems(response.data);
      } catch (error) {
        console.error('Error fetching slider items:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Carousel>
      {sliderItems.map((item, index) => (
        <CarouselItem key={index}>
          <CarouselImg src={isMobile ? item.path_mobile : item.path_web} />
        </CarouselItem>
      ))}
    </Carousel>
  );
};

const useCheckIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
};

export default CarouselSection;