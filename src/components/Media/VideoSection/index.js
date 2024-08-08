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
import { dataServer } from '../../DataServer';

const VideoSection = () => {
  const [VideoData, setVideoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${dataServer.href}/api/v1/video?status=true`);
        setVideoData(response.data);
      } catch (error) {
        console.error('Error fetching Video data:', error);
      }
    };

    fetchData();
  }, []);

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
