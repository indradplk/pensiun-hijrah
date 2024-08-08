import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AwardContainer,
  AwardWrapper,
  AwardCard,
  AwardIcon,
  AwardH2,
} from './AwardElements';
import { dataServer } from '../../DataServer';

const AwardSection = () => {
  const [awardData, setAwardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${dataServer.href}/api/v1/award?status=true`);
        setAwardData(response.data);
      } catch (error) {
        console.error('Error fetching Award data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <AwardContainer id="award">
      <AwardWrapper>
        {awardData.map((item) => (
          <AwardCard key={item.id}>
            <AwardIcon src={item.path_award} />
            <AwardH2>{item.description}</AwardH2>
          </AwardCard>
        ))}
      </AwardWrapper>
    </AwardContainer>
  );
};

export default AwardSection;
