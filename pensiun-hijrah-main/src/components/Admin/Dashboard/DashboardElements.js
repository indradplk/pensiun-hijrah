import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';

export const DashboardContainer = styled.div`
  color: #fff;
  background: ${({ lightBg }) => (lightBg ? '#f9f9f9' : '#61298A')};
  @media screen and (max-width: 1024px) {
    padding: 20px 50px;
  }
  @media screen and (max-width: 820px) {
    padding: 20px 30px;
  }
`;
export const DashboardWrapper = styled.div`
  display: grid;
  z-index: 1;
  height: auto;
  width: 100%;
  max-width: 1100px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 24px;
  justify-content: center;

  @media screen and (max-width: 1024px) {
    height: 500px;
  }

  @media screen and (max-width: 820px) {
    height: 900px;
  }

  @media screen and (max-width: 480px) {
    height: auto;
    padding: 0 5px;
  }
`;
export const DashboardRow = styled.div`
  display: grid;
  grid-auto-columns: minmax(auto, 1fr);
  align-items: center;
  grid-template-areas: ${({ imgStart }) =>
    imgStart ? `'col2 col1'` : `'col1 col2'`};
  @media screen and (max-width: 820px) {
    grid-template-areas: ${({ imgStart }) =>
      imgStart ? `'col2' 'col1'` : `'col1' 'col2'`};
  }
  @media screen and (max-width: 480px) {
    align-content: center;
  }
`;
export const DashboardCardWrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 0.3fr;
  grid-gap: 20px;
  align-items: center;
  justify-items: start;
  justify-content: start;
  @media screen and (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;
export const DashboardTextWrapper = styled.div`
  padding-top: 0;
  display: flex;
  flex-direction: column;
`;
export const DashboardCard = styled.div`
  background: #fff;
  display: grid;
  justify-content: start;
  align-items: flex-start;
  border-radius: 10px;
  width: auto;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;
export const Column1 = styled.div`
  padding: 0 15px;
  grid-area: col2;

  @media screen and (max-width: 480px) {
    margin-top: 10px;
    padding: 0 5px;
    grid-area: col2;
  }
`;
export const Column2 = styled.div`
  padding: 0 15px;
  grid-area: col1;

  @media screen and (max-width: 480px) {
    margin-top: 10px;
    padding: 0 5px;
    grid-area: col1;
  }
`;
export const TextWrapper = styled.div`
  max-width: 540px;
  padding-top: 0;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
  grid-gap: 32px;

  @media screen and (max-width: 480px) {
    padding-bottom: 5px;
  }
`;
export const Heading = styled.h1`
  font-size: 36px;
  line-height: 1.1;
  font-weight: 600;
  color: ${({ lightText }) => (lightText ? '#f7f8fa' : '#212121')};
  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;
export const Title = styled.h2`
  margin-bottom: 16px;
  font-size: 18px;
  line-height: 1.1;
  font-weight: 600;
  color: ${({ lightText }) => (lightText ? '#f7f8fa' : '#212121')};
`;
export const Subtitle = styled.p`
  font-size: 16px;
  margin-bottom: 0;
  color: ${({ darkText }) => (darkText ? '#212121' : '#fff')};
`;
export const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-start;
`;
export const ImgWrap = styled.div`
  max-width: 555px;
  height: 100%;
`;
export const Img = styled.img`
  width: 90%;
  margin: 0 0 60px 0;
  padding-right: 0;

  @media screen and (max-width: 480px) {
    margin-bottom: 40px;
    width: 100%;
  }
`;
export const Icon = styled.img`
  width: 60px;
  @media screen and (max-width: 480px) {
    width: 50px;
  }
`;
export const BtnLink = styled(LinkR)`
  border-radius: 50px;
  text-align: center;
  background: #01bf71;
  white-space: nowrap;
  padding: 10px 22px;
  color: #fff;
  width: auto;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2 ease-ease-in-out;
  text-decoration: none;
  @media screen and (max-width: 820px) {
    font-size: 16px;
    width: auto;
  }
  @media screen and (max-width: 480px) {
    font-size: 16px;
    width: auto;
  }
  &:hover {
    transition: all 0.2 ease-in-out;
    background: #010101;
    color: #fff;
  }
`;
