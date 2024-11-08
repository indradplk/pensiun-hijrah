import styled from 'styled-components';
export const InvestContainer = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;

  @media screen and (max-width: 820px) {
    height: auto;
  }

  @media screen and (max-width: 480px) {
    height: auto;
  }
`;
export const InvestWrapper = styled.div`
  width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 32px;
  padding: 0 50px;

  @media screen and (max-width: 1024px) {
    width: auto;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 60px;
  }

  @media screen and (max-width: 820px) {
    width: auto;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 480px) {
    width: auto;
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
`;
export const InvestCard = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  height: 200px;
  padding: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }

  @media screen and (max-width: 1024px) {
    max-width: 1000px;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 60px;
  }

  @media screen and (max-width: 820px) {
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 20px;
    height: 250px;
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;
export const InvestIcon = styled.img`
  height: 60px;
  width: 60px;
  margin-bottom: 20px;
`;
export const InvestH1 = styled.h1`
  font-size: 2.5rem;
  color: #f212121;
  margin-bottom: 48px;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
    padding: 30px;
    margin-bottom: 16px;
    margin-top: 20px;
  }
`;
export const InvestH2 = styled.h2`
  font-size: 1rem;
  margin-bottom: 10px;
  text-align: center;
  color: #212121;
`;
export const InvestP = styled.p`
  font-size: 1rem;
`;
