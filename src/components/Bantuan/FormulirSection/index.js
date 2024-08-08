import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FormulirContainer,
  FormulirWrapper,
  FormulirCard,
  FormulirH2,
  FormulirCardWrapper,
  DocumentIconLink,
  BtnLink,
  GuideWrapper,
  Column1,
  Column2,
  NavItems
} from './FormulirElements';
import { Nav, TabContainer, NavLink, TabContent, TabPane } from 'react-bootstrap';
import '../../../style.css';
import {
  FaFilePdf
} from 'react-icons/fa';
import { dataServer } from '../../DataServer';

const FormulirSection = () => {
  const [FormulirData, setFormulirData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${dataServer.href}/api/v1/bantuan?status=true`);
        setFormulirData(response.data);
      } catch (error) {
        console.error('Error fetching formulir data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDownload = (path_bantuan) => {
    window.open(`${dataServer.href}/bantuan/panduan/${path_bantuan}`, '_blank');
  };

  return (
    <>
      <FormulirContainer>
        <FormulirWrapper>
          <TabContainer id="left-tabs-example" defaultActiveKey="first">
            <Column1>
              <Nav variant="pills" className="flex-column">
                <NavItems>
                  <NavLink eventKey="first" className="panduan">Formulir</NavLink>
                </NavItems>
                <NavItems>
                  <NavLink eventKey="second" className="panduan">Peraturan Dana Pensiun</NavLink>
                </NavItems>
              </Nav>
            </Column1>
            <Column2>
              <TabContent>
                <TabPane eventKey="first">
                  <GuideWrapper>
                    {FormulirData.map((item) => (
                    item.kategori === 'formulir' &&
                    <FormulirCard key={item.id}>
                      <FormulirCardWrapper>
                        <DocumentIconLink>
                          <FaFilePdf />
                        </DocumentIconLink>
                        <FormulirH2>{item.title}</FormulirH2>
                        <BtnLink to="#" onClick={() => handleDownload(item.path_bantuan)}>Download</BtnLink>        
                      </FormulirCardWrapper>
                    </FormulirCard>
                    ))}
                  </GuideWrapper>
                </TabPane>
                <TabPane eventKey="second">
                  <GuideWrapper>
                    {FormulirData.map((item) => (
                    item.kategori === 'pdp' &&
                    <FormulirCard key={item.id}>
                      <FormulirCardWrapper>
                        <DocumentIconLink>
                          <FaFilePdf />
                        </DocumentIconLink>
                        <FormulirH2>{item.title}</FormulirH2>
                        <BtnLink to="#" onClick={() => handleDownload(item.path_bantuan)}>Download</BtnLink>        
                      </FormulirCardWrapper>
                    </FormulirCard>
                    ))}
                  </GuideWrapper>
                </TabPane>
              </TabContent>
            </Column2>
          </TabContainer>
        </FormulirWrapper>
      </FormulirContainer>
    </>
  );
};

export default FormulirSection;
