import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';

export const NewsContainer = styled.div`
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
export const NewsWrapper = styled.div`
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
export const NewsCardWrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  grid-gap: 20px;
  width: auto;

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 820px) {
    width: auto;
    grid-template-columns: 1fr;
    grid-gap: 32px;
  }
  @media screen and (max-width: 480px) {
    width: auto;
    grid-template-columns: 1fr;
    grid-gap: 21px;
  }
`;
export const NewsCardTextWrapper = styled.div`
  margin: 0 auto;
  display: column;
  grid-template-columns: 1fr;
  align-items: start;
  grid-gap: 10px;
  width: 450px;
  @media screen and (max-width: 820px) {
    width: auto;
  }
  @media screen and (max-width: 480px) {
    width: auto;
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
`;
export const Heading = styled.h1`
  margin-bottom: 12px;
  font-size: 42px;
  line-height: 1.1;
  font-weight: 600;
  color: '#f7f8fa';
  @media screen and (max-width: 480px) {
    font-size: 24px;
    width: 300px;
  }
`;
export const NewsH2 = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: '#f7f8fa';
  width: 300px;
  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`;
export const Subtitle = styled.p`
  font-size: 14px;
`;
export const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-start;
`;
export const BtnLink = styled(LinkR)`
  border-radius: 50px;
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
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2 ease-ease-in-out;
  text-decoration: none;
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
export const NewsCard = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  height: 520px;
  padding: 25px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
  width: 340px;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  @media screen and (max-width: 1024px) {
    height: 210px;
    padding: 30px;
  }

  @media screen and (max-width: 820px) {
    display: flex;
    flex-direction: grid;
    justify-content: flex-start;
    align-items: center;
    padding: 25px;
    grid-gap: 20px;
    height: auto;
  }

  @media screen and (max-width: 480px) {
    display: grid;
    justify-content: flex-start;
    justify-items: center;
    width: auto;
    height: auto;
    padding: 20px;
    grid-gap: 20px;
  }
`;
export const NewsIcon = styled.img`
  width: 300px;
  margin-bottom: 20px;
  border-radius: 10px;
  @media screen and (max-width: 480px) {
    margin-bottom: 0;
  }
`;
