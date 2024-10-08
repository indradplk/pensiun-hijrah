import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';

export const AktivitasContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;
  padding: 40px 0;

  @media screen and (max-width: 768px) {
    height: 500px;
  }

  @media screen and (max-width: 480px) {
    height: auto;
  }
`;
export const AktivitasWrapper = styled.div`
  width: 1100px;
  margin: 0 auto;
  display: grid;
  align-items: center;
  padding: 40px 50px;

  @media screen and (max-width: 1000px) {
    max-width: 700px;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 60px;
  }

  @media screen and (max-width: 786px) {
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 20px 50px;
  }
`;
export const AktivitasCard = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  height: 220px;
  padding: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  @media screen and (max-width: 1000px) {
    height: 210px;
    padding: 30px;
  }

  @media screen and (max-width: 480px) {
    height: 180px;
    padding: 30px;
  }
`;
export const AktivitasIcon = styled.img`
  height: 60px;
  width: 60px;
  margin-bottom: 20px;
`;
export const AktivitasH1 = styled.h1`
  font-size: 2.5rem;
  color: #212121;
  margin-bottom: 20px;

  @media screen and (max-width: 786px) {
    font-size: 2rem;
    padding: 50px;
    margin-bottom: 16px;
  }

  @media screen and (max-width: 480px) {
    font-size: 32px;
    padding: 20px 60px;
    margin-bottom: 5px;
  }
`;
export const AktivitasH2 = styled.h2`
  font-size: 1rem;
  margin-bottom: 10px;
  text-align: center;
  color: #212121;
`;
export const AktivitasP = styled.p`
  font-size: 1rem;
`;
export const BtnLink = styled(LinkR)`
  border-radius: 50px;
  background: #01bf71;
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
    background: #212121;
    color: #fff;
  }
  @media screen and (max-width: 480px) {
    width: auto;
  }
`;
export const BtnLoad = styled(LinkR)`
  border-radius: 50px;
  width: 200px;
  margin-top: -20px;
  text-align: center;
  background: #01bf71;
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
    background: #212121;
    color: #fff;
  }
  @media screen and (max-width: 480px) {
    width: auto;
  }
`;
export const FormInput = styled.input`
  padding: 10px 22px;
  margin-top: 20px;
  border-radius: 50px;
  font-size: 14px;
  width: 400px;
`;