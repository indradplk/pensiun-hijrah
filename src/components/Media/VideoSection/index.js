import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  VideoContainer,
  VideoWrapper,
  VideoCard,
  VideoH2,
} from './VideoElements';
import YouTube from 'react-youtube';
import { styleVideo } from './Data';

const VideoSection = () => {
  const [VideoData, setVideoData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);  

  const fetchData = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + '/video?status=true')
      .then((response) => {
        const sortedData = response.data.content.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });

        setVideoData(sortedData);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <VideoContainer id="video">
      <VideoWrapper>
        {VideoData.map((item) => (
          <VideoCard key={item.id}>
            <YouTube
              videoId={item.link}
              opts={styleVideo}
            />
            <VideoH2>{item.title}</VideoH2>
          </VideoCard>
        ))}
      </VideoWrapper>
    </VideoContainer>
  );
};

export default VideoSection;
