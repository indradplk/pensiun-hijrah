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
    fetchData();
  }, []);  

  const fetchData = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + '/report?kategori=pengawas&status=true')
      .then((response) => {
        setPengawasData(response.data.content.reverse());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDownload = (path_report) => {
    window.open(`/report/${path_report}`, '_blank');
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
