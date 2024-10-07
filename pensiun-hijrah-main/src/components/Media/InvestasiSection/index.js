import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  InvestasiContainer,
  InvestasiWrapper,
  InvestasiCard,
  InvestasiH2,
  InvestasiCardWrapper,
  DocumentIconLink,
  BtnLink,
} from './InvestasiElements';
import {
  FaFilePdf
} from 'react-icons/fa';

const InvestasiSection = () => {
  const [InvestasiData, setInvestasiData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);  

  const fetchData = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + '/report?kategori=investasi&status=true')
      .then((response) => {
        setInvestasiData(response.data.content.reverse());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDownload = (path_report) => {
    window.open(`/report/${path_report}`, '_blank');
  };

  return (
    <InvestasiContainer id="investasi">
      <InvestasiWrapper>
        {InvestasiData.map((item) => (
          <InvestasiCard key={item.id}>
            <InvestasiCardWrapper>
              <DocumentIconLink>
                <FaFilePdf />
              </DocumentIconLink>
              <InvestasiH2>{item.title}</InvestasiH2>
              <BtnLink to="#" onClick={() => handleDownload(item.path_report)}>Download</BtnLink>
            </InvestasiCardWrapper>
          </InvestasiCard>
        ))}
      </InvestasiWrapper>
    </InvestasiContainer>
  );
};

export default InvestasiSection;
