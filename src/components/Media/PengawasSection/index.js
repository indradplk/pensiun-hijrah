import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  PengawasContainer,
  PengawasWrapper,
  PengawasCard,
  PengawasH2,
  PengawasCardWrapper,
  DocumentIconLink,
  BtnLink,
} from './PengawasElements';
import {
  FaFilePdf
} from 'react-icons/fa';
import { dataServer } from '../../DataServer';

const PengawasSection = () => {
  const [PengawasData, setPengawasData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${dataServer.href}/api/v1/report?kategori=pengawas&status=true`);
        setPengawasData(response.data.reverse());
      } catch (error) {
        console.error('Error fetching Pengawas data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDownload = (path) => {
    window.open(`${dataServer.href}/media/laporan/${path}`, '_blank');
  };

  return (
    <PengawasContainer id="pengawas">
      <PengawasWrapper>
        {PengawasData.map((item) => (
          <PengawasCard key={item.id}>
            <PengawasCardWrapper>
              <DocumentIconLink>
                <FaFilePdf />
              </DocumentIconLink>
              <PengawasH2>{item.title}</PengawasH2>
              <BtnLink to="#" onClick={() => handleDownload(item.path_report)}>Download</BtnLink>
            </PengawasCardWrapper>
          </PengawasCard>
        ))}
      </PengawasWrapper>
    </PengawasContainer>
  );
};

export default PengawasSection;
