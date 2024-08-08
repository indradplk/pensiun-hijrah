import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  PanduanContainer,
  PanduanWrapper,
  NavItems,
  PanduanCard,
  Column1,
  Column2,
  PanduanCardWrapper,
  DocumentIconLink,
  BtnLink,
  PanduanH2,
  GuideWrapper,
} from './PanduanElements';
import { Nav, TabContainer, NavLink, TabContent, TabPane } from 'react-bootstrap';
import '../../../style.css';
import {
  FaFilePdf
} from 'react-icons/fa';
import { dataServer } from '../../DataServer';

const PanduanSection = () => {
  const [PanduanData, setPanduanData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${dataServer.href}/api/v1/bantuan?status=true`);
        setPanduanData(response.data);
      } catch (error) {
        console.error('Error fetching Panduan data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDownload = (path_bantuan) => {
    window.open(`${dataServer.href}/bantuan/panduan/${path_bantuan}`, '_blank');
  };

  return (
    <>
      <PanduanContainer>
        <PanduanWrapper>
          <TabContainer id="left-tabs-example" defaultActiveKey="first">
            <Column1>
              <Nav variant="pills" className="flex-column">
                <NavItems>
                  <NavLink eventKey="first" className="panduan">Peserta</NavLink>
                </NavItems>
                <NavItems>
                  <NavLink eventKey="second" className="panduan">Iuran</NavLink>
                </NavItems>
                <NavItems>
                  <NavLink eventKey="third" className="panduan">Klaim</NavLink>                  
                </NavItems>
                <NavItems>
                  <NavLink eventKey="fourth" className="panduan">Pengalihan</NavLink>
                </NavItems>
              </Nav>
            </Column1>
            <Column2>
              <TabContent>
                <TabPane eventKey="first">
                  <GuideWrapper>
                    {PanduanData.map((item) => (
                    item.kategori === 'peserta' &&
                    <PanduanCard key={item.id}>
                      <PanduanCardWrapper>
                        <DocumentIconLink>
                          <FaFilePdf />
                        </DocumentIconLink>
                        <PanduanH2>{item.title}</PanduanH2>
                        <BtnLink to="#" onClick={() => handleDownload(item.path_bantuan)}>Download</BtnLink>        
                      </PanduanCardWrapper>
                    </PanduanCard>
                    ))}
                  </GuideWrapper>
                </TabPane>
                <TabPane eventKey="second">
                  <GuideWrapper>
                    {PanduanData.map((item) => (
                    item.kategori === 'iuran' &&
                    <PanduanCard key={item.id}>
                      <PanduanCardWrapper>
                        <DocumentIconLink>
                          <FaFilePdf />
                        </DocumentIconLink>
                        <PanduanH2>{item.title}</PanduanH2>
                        <BtnLink to="#" onClick={() => handleDownload(item.path_bantuan)}>Download</BtnLink>        
                      </PanduanCardWrapper>
                    </PanduanCard>
                    ))}
                  </GuideWrapper>
                </TabPane>
                <TabPane eventKey="third">
                  <GuideWrapper>
                    {PanduanData.map((item) => (
                    item.kategori === 'klaim' &&
                    <PanduanCard key={item.id}>
                      <PanduanCardWrapper>
                        <DocumentIconLink>
                          <FaFilePdf />
                        </DocumentIconLink>
                        <PanduanH2>{item.title}</PanduanH2>
                        <BtnLink to="#" onClick={() => handleDownload(item.path_bantuan)}>Download</BtnLink>        
                      </PanduanCardWrapper>
                    </PanduanCard>
                    ))}
                  </GuideWrapper>
                </TabPane>
                <TabPane eventKey="fourth">
                  <GuideWrapper>
                    {PanduanData.map((item) => (
                    item.kategori === 'pengalihan' &&
                    <PanduanCard key={item.id}>
                      <PanduanCardWrapper>
                        <DocumentIconLink>
                          <FaFilePdf />
                        </DocumentIconLink>
                        <PanduanH2>{item.title}</PanduanH2>
                        <BtnLink to="#" onClick={() => handleDownload(item.path_bantuan)}>Download</BtnLink>        
                      </PanduanCardWrapper>
                    </PanduanCard>
                    ))}
                  </GuideWrapper>
                </TabPane>
              </TabContent>
            </Column2>
          </TabContainer>
        </PanduanWrapper>
      </PanduanContainer>
    </>
  );
};

export default PanduanSection;
