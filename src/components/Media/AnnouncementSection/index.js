import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';
import {
  AnnouncementContainer,
  AnnouncementWrapper,
  AnnouncementCard,
  AnnouncementIcon,
  AnnouncementCardWrapper,
  AnnouncementH2,
  AnnouncementCardTextWrapper,
  TopLine,
  BtnLink,
  BtnWrap,
} from './AnnouncementElements';
import '../../../style.css';
import { animateScroll as scroll } from 'react-scroll';

const AnnouncementSection = () => {
  const [AnnouncementData, setAnnouncementData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);  

  const fetchData = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + '/announcement?status=true')
      .then((response) => {
        const sortedData = response.data.content.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });

        const formattedData = sortedData.map(item => ({
          ...item,
          createdAt: format(new Date(item.createdAt), 'dd MMM yyyy', { locale: id }),
        }));

        setAnnouncementData(formattedData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <AnnouncementContainer>
        <AnnouncementWrapper>
          <AnnouncementCardWrapper>
            {AnnouncementData.map((item) => (
              <AnnouncementCard key={item.id}>
                <AnnouncementIcon src={`/pengumuman/${item.path_announcement}`} />
                <AnnouncementCardTextWrapper>
                  <TopLine>{item.createdAt}</TopLine>
                  <AnnouncementH2><b>{item.title}</b></AnnouncementH2>
                  <BtnWrap>
                    <BtnLink to={`/media/pengumuman/${item.seo}`} onClick={toggleHome}>Selengkapnya</BtnLink>
                  </BtnWrap>
                </AnnouncementCardTextWrapper>
              </AnnouncementCard> 
            ))}
          </AnnouncementCardWrapper>
        </AnnouncementWrapper>
      </AnnouncementContainer>
    </>
  );
};

export default AnnouncementSection;
