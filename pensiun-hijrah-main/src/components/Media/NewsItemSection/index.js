import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';
import { useParams } from 'react-router-dom';
import {
  NewsItemContainer,
  NewsItemWrapper,
  Heading,
  TopLine,
  Subtitle,
  NewsItemIcon,
  Paragraph,
} from './NewsItemElements';
import { dataServer } from '../../DataServer';

const NewsItemSection = () => {
  const { seo } = useParams(); // Ambil SEO berita dari URL
  const [NewsItem, setNewsItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, [seo]);  

  const fetchData = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + `/news/${seo}`)
      .then((response) => {
        const formattedData = {
          ...response.data.content,
          kategori: convertKategori(response.data.content.kategori),
          createdAt: format(new Date(response.data.content.createdAt), 'dd MMM yyyy', { locale: id }), // Format tanggal
        };

        setNewsItem(formattedData);
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

  return (
    <NewsItemContainer>
      {NewsItem && (
        <NewsItemWrapper>
          <TopLine>{NewsItem.kategori}</TopLine>
          <Heading>{NewsItem.title}</Heading>
          <Subtitle>{NewsItem.createdAt}</Subtitle>
          <NewsItemIcon src={`/berita/${NewsItem.path_news}`} />
          <Paragraph dangerouslySetInnerHTML={{ __html: NewsItem.description }} />
        </NewsItemWrapper>
      )}
    </NewsItemContainer>
  );
};

export default NewsItemSection;
