import styled from 'styled-components';
export const PerbedaanContainer = styled.div`
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;
  @media screen and (max-width: 480px) {
    height: auto; 
  }
`;
export const PerbedaanWrapper = styled.div`
  width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-gap: 32px;
  padding: 0 50px;

  @media screen and (max-width: 1000px) {
    max-width: 700px;
    grid-template-columns: 1fr;
    margin-bottom: 60px;
  }

  @media screen and (max-width: 786px) {
    grid-template-columns: 1fr;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 480px) {
    width: auto;
    grid-template-columns: 1fr;
    padding: 0 0;
  }
`;
export const TextWrapper = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  width: 600px;
  padding: 0 40px;
  @media screen and (max-width: 480px) {
    width: auto;
  }
`;
export const PerbedaanH1 = styled.h1`
  color: #212121;
  font-size: 36px;
  line-height: 1.1;
  font-weight: 600;

  @media screen and (max-width: 786px) {
    font-size: 2rem;
    padding: 50px;
    margin-bottom: 16px;
  }

  @media screen and (max-width: 480px) {
    font-size: 2rem;
    padding: 40px;
    margin-bottom: 5px;
  }
`;
export const PerbedaanH2 = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
  color: #212121;
  line-height: 24px;

  @media screen and (max-width: 480px) {
    margin-bottom: 20px;
  }
`;
export const PerbedaanP = styled.p`
  font-size: 1rem;
`;
