import styled from 'styled-components';

export const InfoContainer = styled.div`
  color: #fff;
  background: ${({ lightBg }) => (lightBg ? '#f9f9f9' : '#61298A')};
  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
  @media screen and (max-width: 1024px) {
    padding: 20px 50px;
  }
`;
export const InfoWrapper = styled.div`
  display: grid;
  z-index: 1;
  height: 600px;
  width: 100%;
  max-width: 1100px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 24px;
  justify-content: center;

  @media screen and (max-width: 1024px) {
    height: 500px;
    margin-top: 50px;
  }

  @media screen and (max-width: 768px) {
    height: 900px;
  }

  @media screen and (max-width: 480px) {
    height: 900px;
    padding: 0 5px;
  }
`;
export const InfoRow = styled.div`
  display: grid;
  grid-auto-columns: minmax(auto, 1fr);
  align-items: center;
  grid-template-areas: ${({ imgStart }) =>
    imgStart ? `'col2 col1'` : `'col1 col2'`};
  @media screen and (max-width: 768px) {
    grid-template-areas: ${({ imgStart }) =>
      imgStart ? `'col2' 'col1'` : `'col1' 'col2'`};
  }
  @media screen and (max-width: 480px) {
    align-content: center;
  }
`;
export const Column1 = styled.div`
  margin-top: 150px;
  padding: 0 15px;
  grid-area: col1;

  @media screen and (max-width: 480px) {
    margin-top: 10px;
    padding: 0 5px;
    grid-area: col1;
  }
`;
export const Column2 = styled.div`
  margin-top: 100px;
  padding: 0 15px;
  grid-area: col2;

  @media screen and (max-width: 480px) {
    margin-top: 10px;
    padding: 0 5px;
    grid-area: col2;
  }
`;
export const TextWrapper = styled.div`
  max-width: 540px;
  padding-top: 0;
  padding-bottom: 60px;

  @media screen and (max-width: 480px) {
    padding-bottom: 5px;
  }
`;
export const Heading = styled.h1`
  margin-bottom: 24px;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 600;
  color: ${({ lightText }) => (lightText ? '#f7f8fa' : '#212121')};
  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;
export const Subtitle = styled.p`
  max-width: 500px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  color: ${({ darkText }) => (darkText ? '#212121' : '#fff')};
`;
export const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-start;
`;
export const ImgWrap = styled.div`
  max-width: 555px;
  height: 100%;
`;
export const Img = styled.img`
  width: 100%;
  margin: 0 0 40px 0;
  padding-right: 0;

  @media screen and (max-width: 480px) {
    margin: 0 0 0 0;
  }
`;
