import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ManagementContainer,
  ManagementWrapper,
  NavItems,
  ManagementCard2,
  ManagementIcon,
  Column1,
  Column2,
  ManagementCardWrapper,
  ManagementH2,
  Heading,
  Subtitle,
  ManagementCardTextWrapper,
  TopLine,
} from './ManagementElements';
import { Nav, TabContainer, NavLink, TabContent, TabPane } from 'react-bootstrap';
import '../../../style.css';
import { dataServer } from '../../DataServer';

const ManagementSection = () => {
  const [managementData, setManagementData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${dataServer.href}/api/v1/management?status=true`);
        setManagementData(response.data);
      } catch (error) {
        console.error('Error fetching management data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ManagementContainer>
        <ManagementWrapper>
          <TabContainer id="left-tabs-example" defaultActiveKey="first">
            <Column1>
              <Nav variant="pills" className="flex-column">
                <NavItems>
                  <NavLink eventKey="first" className="management">Pengurus</NavLink>
                </NavItems>
                <NavItems>
                  <NavLink eventKey="second" className="management">Dewan Pengawas</NavLink>                  
                </NavItems>
                <NavItems>
                  <NavLink eventKey="third" className="management">Dewan Pengawas Syariah</NavLink>
                </NavItems>
              </Nav>
            </Column1>
            <Column2>
              <TabContent>
                <TabPane eventKey="first">
                <ManagementCardWrapper>
                    <Heading>Pengurus</Heading>
                    {managementData.map((item) => (
                      item.kategori === 'pengurus' && (
                        <ManagementCard2 key={item.id}>
                          <ManagementIcon src={item.path_management} />
                          <ManagementCardTextWrapper>
                            <ManagementH2><b>{item.nama}</b></ManagementH2>
                            <Subtitle>{item.jabatan}</Subtitle>
                            <TopLine dangerouslySetInnerHTML={{ __html: item.description }} />
                          </ManagementCardTextWrapper>
                        </ManagementCard2>
                      )
                    ))}
                  </ManagementCardWrapper>
                </TabPane>
                <TabPane eventKey="second">
                <ManagementCardWrapper>
                    <Heading>Dewan Pengawas</Heading>
                    {managementData.map((item) => (
                      item.kategori === 'pengawas' && (
                        <ManagementCard2 key={item.id}>
                          <ManagementIcon src={item.path_management} />
                          <ManagementCardTextWrapper>
                            <ManagementH2><b>{item.nama}</b></ManagementH2>
                            <Subtitle>{item.jabatan}</Subtitle>
                            <TopLine dangerouslySetInnerHTML={{ __html: item.description }} />
                          </ManagementCardTextWrapper>
                        </ManagementCard2>
                      )
                    ))}
                  </ManagementCardWrapper>
                </TabPane>
                <TabPane eventKey="third">
                  <ManagementCardWrapper>
                    <Heading>Dewan Pengawas Syariah</Heading>
                    {managementData.map((item) => (
                      item.kategori === 'dps' && (
                        <ManagementCard2 key={item.id}>
                          <ManagementIcon src={item.path_management} />
                          <ManagementCardTextWrapper>
                            <ManagementH2><b>{item.nama}</b></ManagementH2>
                            <Subtitle>{item.jabatan}</Subtitle>
                            <TopLine dangerouslySetInnerHTML={{ __html: item.description }} />
                          </ManagementCardTextWrapper>
                        </ManagementCard2>
                      )
                    ))}
                  </ManagementCardWrapper>
                </TabPane>
              </TabContent>
            </Column2>
          </TabContainer>
        </ManagementWrapper>
      </ManagementContainer>
    </>
  );
};

export default ManagementSection;
