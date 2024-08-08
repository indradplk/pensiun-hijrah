import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';

export const InvestasiContainer = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;
`;
export const InvestasiWrapper = styled.div`
  width: 1024px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  grid-gap: 32px;
  padding: 50px 20px;

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
export const InvestasiCard = styled.div`
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
export const InvestasiCardWrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 0.4fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  @media screen and (max-width: 480px) {
    grid-template-columns: 0.3fr 1fr 1fr;
  }
`;
export const InvestasiH1 = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 48px;

  @media screen and (max-width: 820px) {
    font-size: 2rem;
    padding: 50px;
    margin-bottom: 16px;
  }

  @media screen and (max-width: 480px) {
    font-size: 2.3rem;
    padding: 30px;
    margin-bottom: 5px;
  }
`;
export const InvestasiH2 = styled.h2`
  font-size: 18px;
  margin-top: 10px;
  color: #212121;
  font-weight: 600;
  width: 400px;

  @media screen and (max-width: 820px) {
    font-size: 16px;
    width: auto;
  }

  @media screen and (max-width: 480px) {
    font-size: 16px;
    width: auto;
  }
`;
export const InvestasiP = styled.p`
  font-size: 1rem;
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
