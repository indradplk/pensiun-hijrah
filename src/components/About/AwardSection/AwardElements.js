import styled from 'styled-components';
export const AwardContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;

  @media screen and (max-width: 768px) {
    height: 500px;
  }

  @media screen and (max-width: 480px) {
    height: auto;
  }
`;
export const AwardWrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 32px;
  padding: 50px 10px;

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
    padding: 10px 40px;
    grid-template-columns: 1fr;
    width: auto;
  }
`;
export const AwardCard = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  height: auto;
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
    width: auto;
    height: auto;
    padding: 30px;
  }
`;
export const AwardIcon = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 20px;
`;
export const AwardH1 = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 48px;

  @media screen and (max-width: 480px) {
    font-size: 2.3rem;
    padding: 30px;
    margin-bottom: 5px;
  }

  @media screen and (max-width: 786px) {
    font-size: 2rem;
    padding: 50px;
    margin-bottom: 16px;
  }
`;
export const AwardH2 = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
  text-align: center;
  color: #212121;
  font-weight: 600;
`;
export const AwardP = styled.p`
  font-size: 1rem;
`;
