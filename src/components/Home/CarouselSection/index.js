import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel, CarouselItem } from 'react-bootstrap';
import { CarouselImg, Link } from './CarouselElements';
import 'bootstrap/dist/css/bootstrap.css';

const CarouselSection = () => {
  const [sliderItems, setSliderItems] = useState([]);
  const isMobile = useCheckIsMobile();

  useEffect(() => {
    fetchData();
  }, []);  

  const fetchData = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + '/slider?status=true')
      .then((response) => {
        setSliderItems(response.data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Carousel>
      {sliderItems.map((item) => (
        <CarouselItem key={item.id}>
          {item.link ? (
            <Link href={item.link} target="_blank">
              <CarouselImg src={isMobile ? `/slider/${item.path_mobile}` : `/slider/${item.path_web}`} />
            </Link>
          ) : (
            <CarouselImg src={isMobile ? `/slider/${item.path_mobile}` : `/slider/${item.path_web}`} />
          )}
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