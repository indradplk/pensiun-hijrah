import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';

export const FloatingContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;
  padding: 0 60px;

  @media screen and (max-width: 768px) {
    height: auto;
    padding: 0 0;
  }
`;
export const FloatingWrapper = styled.div`
  display: none;

  @media screen and (max-width: 786px) {
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    grid-gap: 20px;
    padding: 20px;
  }
`;
export const FloatingCard = styled.div`
  position: absolute; 
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px 20px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);;
  grid-gap: 20px;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
export const FloatingIcon = styled.img`
  height: 60px;
  width: 60px;
  margin-bottom: 20px;
`;
export const FloatingH1 = styled.h1`
  font-size: 2.5rem;
  color: #212121;
  margin-bottom: 48px;

  @media screen and (max-width: 480px) {
    font-size: 2.3rem;
    padding: 30px;
  }

  @media screen and (max-width: 786px) {
    font-size: 2rem;
    padding: 50px;
    margin-bottom: 16px;
  }
`;
export const FloatingH2 = styled.h2`
  font-size: 1rem;
  margin-bottom: 10px;
  text-align: center;
  color: #212121;
`;
export const FloatingP = styled.p`
  font-size: 1rem;
`;
export const BtnLink1 = styled(LinkR)`
  border-radius: 8px;
  background: linear-gradient(
    108deg,
    #D7A1FF 0%,
    #61298A 100%
  );
  white-space: nowrap;
  padding: 12px 22px;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2 ease-ease-in-out;
  text-decoration: none;
  text-align: center;
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
export const BtnLink2 = styled(LinkR)`
  border-radius: 8px;
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
  padding: 12px 22px;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2 ease-ease-in-out;
  text-decoration: none;
  text-align: center;
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