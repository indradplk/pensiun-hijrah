import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';

export const FAQContainer = styled.div`
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;
`;
export const FAQWrapper = styled.div`
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
export const FAQCard = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border-radius: 10px;
  width: auto;
  padding: 15px;
`;
export const FAQCardWrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 0.4fr 1fr 1fr;
  align-items: center;
  justify-items: center;
  @media screen and (max-width: 480px) {
    grid-template-columns: 0.3fr 1fr 1fr;
  }
`;
export const FAQH1 = styled.h1`
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
export const FAQH2 = styled.h2`
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
export const FAQP = styled.p`
  font-size: 1rem;
`;
export const DocumentIconLink = styled.a`
  color: #61298A;
  font-size: 28px;
`;

export const BtnLink = styled(LinkR)`
  border-radius: 50px;
  text-align: center;
  background: #F7941E;
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
    background: #61298A;
    color: #fff;
  }
`;

export const SearchBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  padding: 10px 22px;
  margin-top: 20px;
  border-radius: 50px;
  font-size: 14px;
  width: 400px;
  @media screen and (max-width: 480px) {
    width: auto;
  }
`;