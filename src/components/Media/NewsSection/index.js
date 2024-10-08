import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';
import {
  NewsContainer,
  NewsWrapper,
  NavItems,
  NewsCard,
  NewsIcon,
  Column1,
  Column2,
  NewsCardWrapper,
  NewsH2,
  Subtitle,
  NewsCardTextWrapper,
  TopLine,
  BtnLink,
  BtnWrap,
} from './NewsElements';
import { Nav, TabContainer, NavLink, TabContent, TabPane } from 'react-bootstrap';
import '../../../style.css';
import { animateScroll as scroll } from 'react-scroll';

const NewsSection = () => {
  const [NewsData, setNewsData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);  

  const fetchData = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + '/news?status=true')
      .then((response) => {
        const formattedData = response.data.content.map(item => ({
          ...item,
          kategori: convertKategori(item.kategori),
          createdAt: format(new Date(item.createdAt), 'dd MMM yyyy', { locale: id }),
        }));

        setNewsData(formattedData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const convertKategori = (kategori) => {
    switch (kategori) {
      case 'artikel':
        return 'Artikel';
      case 'berita':
        return 'Berita';
      default:
        return kategori;
    }
  };

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <NewsContainer>
        <NewsWrapper>
          <TabContainer id="left-tabs-example" defaultActiveKey="first">
            <Column1>
              <Nav variant="pills" className="flex-column">
                <NavItems>
                  <NavLink eventKey="first" className="news">Semua</NavLink>
                </NavItems>
                <NavItems>
                  <NavLink eventKey="second" className="news">Artikel</NavLink>
                </NavItems>
                <NavItems>
                  <NavLink eventKey="third" className="news">Berita</NavLink>
                </NavItems>
              </Nav>
            </Column1>
            <Column2>
              <TabContent>
                <TabPane eventKey="first">
                  <NewsCardWrapper>
                    {NewsData.map((item) => (
                      <NewsCard key={item.id}>
                        <NewsIcon src={`/berita/${item.path_news}`} />
                        <NewsCardTextWrapper>
                          <TopLine>{item.createdAt}</TopLine>
                          <NewsH2><b>{item.title}</b></NewsH2>
                          <Subtitle>{item.kategori}</Subtitle>
                          <BtnWrap>
                            <BtnLink to={`/media/berita/${item.seo}`} onClick={toggleHome}>Selengkapnya</BtnLink>
                          </BtnWrap>
                        </NewsCardTextWrapper>
                      </NewsCard> 
                    ))}
                  </NewsCardWrapper>
                </TabPane>
                <TabPane eventKey="second">
                  <NewsCardWrapper>
                    {NewsData.map((item) => (
                      item.kategori === 'Artikel' &&
                      <NewsCard key={item.id}>
                        <NewsIcon src={`/berita/${item.path_news}`} />
                        <NewsCardTextWrapper>
                          <TopLine>{item.createdAt}</TopLine>
                          <NewsH2><b>{item.title}</b></NewsH2>
                          <Subtitle>{item.kategori}</Subtitle>
                          <BtnWrap>
                            <BtnLink to={`/media/berita/${item.seo}`} onClick={toggleHome}>Selengkapnya</BtnLink>
                          </BtnWrap>
                        </NewsCardTextWrapper>
                      </NewsCard> 
                    ))}
                  </NewsCardWrapper>
                </TabPane>
                <TabPane eventKey="third">
                  <NewsCardWrapper>
                    {NewsData.map((item) => (
                      item.kategori === 'Berita' &&
                      <NewsCard key={item.id}>
                        <NewsIcon src={`/berita/${item.path_news}`} />
                        <NewsCardTextWrapper>
                          <TopLine>{item.createdAt}</TopLine>
                          <NewsH2><b>{item.title}</b></NewsH2>
                          <Subtitle>{item.kategori}</Subtitle>
                          <BtnWrap>
                            <BtnLink to={`/media/berita/${item.seo}`} onClick={toggleHome}>Selengkapnya</BtnLink>
                          </BtnWrap>
                        </NewsCardTextWrapper>
                      </NewsCard> 
                    ))}
                  </NewsCardWrapper>
                </TabPane>
              </TabContent>
            </Column2>
          </TabContainer>
        </NewsWrapper>
      </NewsContainer>
    </>
  );
};

export default NewsSection;
