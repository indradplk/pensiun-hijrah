import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { id } from 'date-fns/locale/id';
import { useParams } from 'react-router-dom';
import {
  AnnouncementItemContainer,
  AnnouncementItemWrapper,
  Heading,
  Subtitle,
  AnnouncementItemIcon,
  Paragraph,
} from './AnnouncementItemElements';

const AnnouncementItemSection = () => {
  const { seo } = useParams(); // Ambil SEO pengumuman dari URL
  const [AnnouncementItem, setAnnouncementItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, [seo]);  

  const fetchData = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + `/announcement/${seo}`)
      .then((response) => {
        const formattedData = {
          ...response.data.content,
          createdAt: format(new Date(response.data.content.createdAt), 'dd MMM yyyy', { locale: id }), // Format tanggal
        };

        setAnnouncementItem(formattedData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <AnnouncementItemContainer>
      {AnnouncementItem && (
        <AnnouncementItemWrapper>
          <Heading>{AnnouncementItem.title}</Heading>
          <Subtitle>{AnnouncementItem.createdAt}</Subtitle>
          <AnnouncementItemIcon src={`/pengumuman/${AnnouncementItem.path_announcement}`} />
          <Paragraph style={{ whiteSpace: 'pre-line' }}>{AnnouncementItem.description}</Paragraph>
          {AnnouncementItem.document && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <embed
                src={`/pengumuman/${AnnouncementItem.document}`}
                type="application/pdf"
                width="100%"
                height="500px"
                style={{ border: '1px solid #ccc', borderRadius: '10px' }}
              />
            </div>
          )}
        </AnnouncementItemWrapper>
      )}
    </AnnouncementItemContainer>
  );
};

export default AnnouncementItemSection;
