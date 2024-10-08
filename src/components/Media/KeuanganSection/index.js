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
    fetchData();
  }, []);  

  const fetchData = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + '/report?kategori=keuangan&status=true')
      .then((response) => {
        setKeuanganData(response.data.content.reverse());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDownload = (path_report) => {
    window.open(`/report/${path_report}`, '_blank');
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
