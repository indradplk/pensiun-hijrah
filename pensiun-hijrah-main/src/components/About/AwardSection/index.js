import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AwardContainer,
  AwardWrapper,
  AwardCard,
  AwardIcon,
  AwardH2,
} from './AwardElements';

const AwardSection = () => {
  const [awardData, setAwardData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);  

  const fetchData = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + '/award?status=true')
      .then((response) => {
        setAwardData(response.data.content.reverse());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <AwardContainer id="award">
      <AwardWrapper>
        {awardData.map((item) => (
          <AwardCard key={item.id}>
            <AwardIcon src={`/penghargaan/${item.path_award}`} />
            <AwardH2>{item.description}</AwardH2>
          </AwardCard>
        ))}
      </AwardWrapper>
    </AwardContainer>
  );
};

export default AwardSection;
