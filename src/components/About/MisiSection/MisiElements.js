import styled from 'styled-components';
export const MisiContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;
  padding: 60px;

  @media screen and (max-width: 768px) {
    height: auto;
  }

  @media screen and (max-width: 480px) {
    height: auto;
  }
`;
export const MisiWrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-gap: 32px;
  padding: 0 50px;

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
    width: auto;
    grid-template-columns: 1fr;
    margin-top: -40px;
  }
`;
export const MisiCard = styled.div`
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
    height: auto;
    padding: 30px;
  }
`;
export const MisiIcon = styled.img`
  height: 60px;
  width: 60px;
  margin-bottom: 20px;
`;
export const MisiH1 = styled.h1`
  font-size: 2.5rem;
  color: #212121;
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
export const MisiH2 = styled.h2`
  font-size: 1rem;
  margin-bottom: 10px;
  text-align: center;
  color: #212121;
`;
export const MisiP = styled.p`
  font-size: 1rem;
`;
