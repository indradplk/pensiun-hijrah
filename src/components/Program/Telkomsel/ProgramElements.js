import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';

export const ProgramContainer = styled.div`
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
export const ProgramWrapper = styled.div`
  width: 900px;
  margin: 0 auto;
  display: column;
  text-align: center;
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
    padding: 0 5px;
  }
`;
export const ProgramCardWrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
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
export const ProgramCardTextWrapper = styled.div`
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
export const ProgramH2 = styled.h2`
  font-size: 11px;
  margin-top: 10px;
  color: '#f7f8fa';
  text-align: center;
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
export const BtnLinks = styled(LinkR)`
  border-radius: 50px;
  background: #9652C8;
  white-space: nowrap;
  padding: 7px 20px;
  color: #fff;
  font-size: 14px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2 ease-ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2 ease-in-out;
    background: #008FD0;
    color: #fff;
  }
`;
export const BtnLink1 = styled.a`
  border-radius: 50px;
  background: #61298A;
  white-space: nowrap;
  padding: 7px 20px;
  color: #fff;
  font-size: 14px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2 ease-ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2 ease-in-out;
    background: #008FD0;
    color: #fff;
  }
`;
export const BtnLink2 = styled.a`
  border-radius: 50px;
  background: #7C3CAA;
  white-space: nowrap;
  padding: 7px 20px;
  color: #fff;
  font-size: 14px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2 ease-ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2 ease-in-out;
    background: #008FD0;
    color: #fff;
  }
`;
export const BtnLink3 = styled.a`
  border-radius: 50px;
  background: #AF66E3;
  white-space: nowrap;
  padding: 7px 20px;
  color: #fff;
  font-size: 14px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2 ease-ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2 ease-in-out;
    background: #008FD0;
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
export const ProgramCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  grid-gap: 10px;
`;
export const ProgramIcon = styled.img`
  width: 100%;
  margin-bottom: 20px;
  border-radius: 10px;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
  @media screen and (max-width: 820px) {
    width: 100%;
    margin-bottom: 10px;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;
export const SocialLogoIcon = styled.img`
  width: 80%;
  margin-bottom: 16px;

  @media screen and (max-width: 820px) {
    width: 70%;
  }
`;
export const Text = styled(LinkR)`
  margin-top: 24px;
  color: #212121;
  font-size: 14px;
  text-align: center;
`;
export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;
export const PopupContent = styled.div`
  position: relative;
  background: white;
  padding: 3px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
  text-align: center;
`;
export const PopupImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
`;
export const PopupCloseButton = styled.div`
  position: absolute;
  margin: 480px auto 0;
  background: #ff4d4d;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background 0.3s;
  &:hover {
    background: #ff1a1a;
`;