import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  KeuanganContainer,
  KeuanganWrapper,
  KeuanganCard,
  KeuanganH2,
  KeuanganCardWrapper,
  DocumentIconLink,
  BtnLink,
} from './KeuanganElements';
import {
  FaFilePdf
} from 'react-icons/fa';
import { dataServer } from '../../DataServer';

const KeuanganSection = () => {
  const [KeuanganData, setKeuanganData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${dataServer.href}/api/v1/report?kategori=keuangan&status=true`);
        setKeuanganData(response.data.reverse());
      } catch (error) {
        console.error('Error fetching Keuangan data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDownload = (path) => {
    window.open(`${dataServer.href}/media/laporan/${path}`, '_blank');
  };

  return (
    <KeuanganContainer id="keuangan">
      <KeuanganWrapper>
        {KeuanganData.map((item) => (
          <KeuanganCard key={item.id}>
            <KeuanganCardWrapper>
              <DocumentIconLink>
                <FaFilePdf />
              </DocumentIconLink>
              <KeuanganH2>{item.title}</KeuanganH2>
              <BtnLink to="#" onClick={() => handleDownload(item.path_report)}>Download</BtnLink>
            </KeuanganCardWrapper>
          </KeuanganCard>
        ))}
      </KeuanganWrapper>
    </KeuanganContainer>
  );
};

export default KeuanganSection;
