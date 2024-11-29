import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';

export const AnnouncementItemContainer = styled.div`
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
export const AnnouncementItemWrapper = styled.div`
  width: 900px;
  margin: 0 auto;
  display: column;
  align-items: start;
  grid-gap: 32px;
  padding: 0 50px;

  @media screen and (max-width: 1024px) {
    width: auto;
    padding: 0 30px;
  }

  @media screen and (max-width: 820px) {
    width: auto;
  }
  @media screen and (max-width: 480px) {
    width: auto;
  }
`;
export const AnnouncementItemCardWrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  grid-gap: auto;
  width: auto;

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    margin-bottom: 60px;
  }

  @media screen and (max-width: 820px) {
    grid-template-columns: 1fr 1fr;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 480px) {
    max-width: 420px;
    grid-template-columns: 1fr;
  }
`;
export const AnnouncementItemCardTextWrapper = styled.div`
  margin: 0 auto;
  display: column;
  grid-template-columns: 1fr;
  align-items: start;
  grid-gap: 10px;
  width: 450px;
`;
export const Column1 = styled.div`
  padding: 0 25px;
  width: 300px;
`;
export const Column2 = styled.div`
  padding: 0 15px;
`;
export const TextWrapper = styled.div`
  max-width: 600px;
  padding-top: 0;
  padding-bottom: 0;
`;
export const TopLine = styled.p`
  font-size: 18px;
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
export const AnnouncementItemH2 = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: '#f7f8fa';
  width: 300px;
`;
export const Subtitle = styled.p`
  font-size: 18px;
`;
export const Paragraph = styled.p`
  font-size: 16px;
  text-align: justify;
`;
export const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-start;
`;
export const BtnLink = styled(LinkR)`
  border-radius: 50px;
  background: #F7941E;
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
    background: #61298A;
    color: #fff;
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
`;
export const AnnouncementItemCard = styled.div`
  background: #e9e9e9;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  width: 150px;
`;
export const AnnouncementItemIcon = styled.img`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 10px;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
  @media screen and (max-width: 820px) {
    width: 100%;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;
