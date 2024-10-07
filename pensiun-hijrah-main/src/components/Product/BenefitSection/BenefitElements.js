import styled from 'styled-components';
export const BenefitContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;
  padding: 60px 0;

  @media screen and (max-width: 820px) {
    height: auto;
    padding: 40px 0;
  }

  @media screen and (max-width: 480px) {
    height: auto;
    padding: 20px 0;
  }
`;
export const BenefitWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 32px;
  padding: 0 50px;

  @media screen and (max-width: 1024px) {
    max-width: 700px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin-bottom: 60px;
  }

  @media screen and (max-width: 786px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 480px) {
    width: auto;
    grid-template-columns: 1fr;
    padding: 0 35px;
  }
`;
export const BenefitCard = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  height: 180px;
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
    width: 300px;
    height: 180px;
    padding: 30px;
  }
`;
export const BenefitIcon = styled.img`
  height: 60px;
  width: 60px;
  margin-bottom: 20px;
`;
export const BenefitH1 = styled.h1`
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
export const BenefitH2 = styled.h2`
  font-size: 1rem;
  margin-bottom: 10px;
  text-align: center;
  color: #212121;
`;
export const BenefitP = styled.p`
  font-size: 1rem;
`;
