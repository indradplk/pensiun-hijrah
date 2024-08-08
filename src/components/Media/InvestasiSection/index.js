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
import { dataServer } from '../../DataServer';

const InvestasiSection = () => {
  const [InvestasiData, setInvestasiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${dataServer.href}/api/v1/report?kategori=investasi&status=true`);
        setInvestasiData(response.data.reverse());
      } catch (error) {
        console.error('Error fetching Investasi data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDownload = (path) => {
    window.open(`${dataServer.href}/media/laporan/${path}`, '_blank');
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
