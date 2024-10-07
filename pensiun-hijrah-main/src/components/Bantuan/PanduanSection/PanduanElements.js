import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';

export const PanduanContainer = styled.div`
  height: auto;
  color: #212121;
  padding: 50px 0;
  background: #f9f9f9;
  @media screen and (max-width: 1024px) {
    padding: 20px 50px;
  }
  @media screen and (max-width: 820px) {
    padding: 10px 30px;
  }
  @media screen and (max-width: 480px) {
    padding: 10px 15px;
  }
`;
export const PanduanWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  align-items: start;
  grid-gap: 32px;
  padding: 0 50px;

  @media screen and (max-width: 1024px) {
    max-width: 700px;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 60px;
  }

  @media screen and (max-width: 820px) {
    width: auto;
    grid-template-columns: 1fr;
    padding: 0 0;
  }
  @media screen and (max-width: 480px) {
    width: auto;
    grid-template-columns: 1fr;
    padding: 0 0;
  }
`;
export const GuideWrapper = styled.div`
  width: auto;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  grid-gap: 32px;

  @media screen and (max-width: 1024px) {
    width: auto;
  }

  @media screen and (max-width: 820px) {
    width: auto;
  }
  @media screen and (max-width: 480px) {
    width: auto;
  }
`;
export const PanduanCard = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-radius: 10px;
  width: auto;
  padding: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;
export const PanduanCardWrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 0.2fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  @media screen and (max-width: 480px) {
    grid-template-columns: 0.3fr 1fr 1fr;
  }
`;
export const Column1 = styled.div`
  padding: 0 25px;
  width: 300px;
  @media screen and (max-width: 820px) {
    padding: 0 0;
    width: auto;
  }
  @media screen and (max-width: 480px) {
    padding: 0 0;
    width: auto;
  }
`;
export const Column2 = styled.div`
  padding: 0 15px;
  @media screen and (max-width: 820px) {
    padding: 0 5px;
    width: auto;
  }
  @media screen and (max-width: 480px) {
    padding: 0 5px;
    width: auto;
  }
`;
export const TextWrapper = styled.div`
  max-width: 600px;
  padding-top: 0;
  padding-bottom: 0;
`;
export const TopLine = styled.p`
  font-size: 16px;
  text-align: justify;
`;
export const Heading = styled.h1`
  margin-bottom: 12px;
  font-size: 42px;
  line-height: 1.1;
  font-weight: 600;
  color: '#f7f8fa';
  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;
export const PanduanH2 = styled.h2`
  font-size: 18px;
  margin-top: 10px;
  color: #212121;
  font-weight: 600;
  width: 400px;
  @media screen and (max-width: 480px) {
    width: auto;
  }
`;
export const Subtitle = styled.p`
  font-size: 18px;
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
  width: 100%;
  margin: 0 0 40px 0;
  padding-right: 0;
`;
export const NavItems = styled.div`
  width: 250px;
  height: 50px;
  @media screen and (max-width: 820px) {
    width: auto;
  }
  @media screen and (max-width: 480px) {
    width: auto;
  }
`;
export const PanduanIcon = styled.img`
  height: 180px;
  border-radius: 200px;
`;
export const DocumentIconLink = styled.a`
  color: #61298A;
  font-size: 28px;
`;

export const BtnLink = styled(LinkR)`
  border-radius: 50px;
  text-align: center;
  background: linear-gradient(
    157.81deg,
    #FFF2E2 -43.27%,
    #FFEAD0 -21.24%,
    #FFDEB8 12.19%,
    #FECC92 29.82%,
    #FCB45F 51.94%,
    #F7941E 90.29%
  );
  white-space: nowrap;
  padding: 10px 22px;
  color: #fff;
  width: 200px;
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
    background: linear-gradient(
      157.81deg,
      #F6FFEE -43.27%,
      #ECFFDB -21.24%,
      #DBFCBD 12.19%,
      #BEF48D 29.82%,
      #A3E169 51.94%,
      #80C342 90.29%
    );
    color: #61298A;
  }
`;
