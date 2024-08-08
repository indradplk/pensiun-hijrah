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
    const fetchData = async () => {
      try {
        const response = await axios.get(`${dataServer.href}/api/v1/news/${seo}`); // Gunakan SEO dari URL
        const formattedData = {
          ...response.data,
          kategori: convertKategori(response.data.kategori),
          createdAt: format(new Date(response.data.createdAt), 'dd MMM yyyy', { locale: id }), // Format tanggal
        };
        setNewsItem(formattedData);
      } catch (error) {
        console.error('Error fetching News item:', error);
      }
    };

    fetchData();
  }, [seo]); // Gunakan SEO sebagai dependency

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
          <NewsItemIcon src={NewsItem.path_news} />
          <Paragraph dangerouslySetInnerHTML={{ __html: NewsItem.description }} />
        </NewsItemWrapper>
      )}
    </NewsItemContainer>
  );
};

export default NewsItemSection;
