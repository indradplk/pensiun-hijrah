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

const FormulirSection = () => {
  const [FormulirData, setFormulirData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);  

  const fetchData = () => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + '/panduan?status=true')
      .then((response) => {
        setFormulirData(response.data.content.reverse());
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDownload = (path_panduan) => {
    window.open(`/panduan/${path_panduan}`, '_blank');
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
                        <BtnLink to="#" onClick={() => handleDownload(item.path_panduan)}>Download</BtnLink>        
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
                        <BtnLink to="#" onClick={() => handleDownload(item.path_panduan)}>Download</BtnLink>        
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
