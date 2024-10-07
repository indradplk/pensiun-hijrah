import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
export const BantuanContainer = styled.div`
  height: auto;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #FCF5E5;

  @media screen and (max-width: 820px) {
    height: auto;
  }

  @media screen and (max-width: 480px) {
    height: auto;
    padding: 15px;
  }
`;
export const BantuanWrapper = styled.div`
  width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  grid-gap: 32px;
  padding: 0 50px;

  @media screen and (max-width: 1024px) {
    max-width: 700px;
    grid-template-columns: 1fr;
    margin-bottom: 60px;
  }

  @media screen and (max-width: 820px) {
    grid-template-columns: 1fr;
    margin-bottom: 20px;
    width: auto;
  }

  @media screen and (max-width: 480px) {
    width: auto;
    grid-template-columns: 1fr;
    padding: 40px 20px;
  }
`;
export const BantuanCard = styled.div`
  background: #fff;
  display: grid;
  grid-template-columns: 0.3fr 1fr;
  justify-content: flex-start;
  justify-items: center;
  align-items: center;
  border-radius: 10px;
  height: auto;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  @media screen and (max-width: 1024px) {
    height: 210px;
    padding: 30px;
  }

  @media screen and (max-width: 480px) {
    display: flex;
    flex-direction: column;
    width: 300px;
    height: auto;
    padding: 30px;
    text-align: center;
  }
`;
export const BantuanIcon = styled.img`
  height: 200px;
  width: 200px;
  @media screen and (max-width: 480px) {
    margin-bottom: 20px;
  }
`;
export const BantuanH1 = styled.h1`
  font-size: 2.5rem;
  color: #212121;
  margin-bottom: 20px;

  @media screen and (max-width: 820px) {
    font-size: 2rem;
    margin-bottom: 16px;
  }

  @media screen and (max-width: 480px) {
    font-size: 24px;
    width: auto;
  }
`;
export const BantuanH2 = styled.h2`
  font-size: 1rem;
  margin-bottom: 20px;
  color: #212121;
  width: 700px;

  @media screen and (max-width: 480px) {
    width: auto;
    font-size: 18px;
  }
`;
export const BantuanP = styled.p`
  font-size: 1rem;
`;
export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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