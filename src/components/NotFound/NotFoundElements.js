import styled from 'styled-components';

export const NotFoundContainer = styled.div`
  color: #fff;
  background: #f9f9f9;
  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
  @media screen and (max-width: 1024px) {
    padding: 20px 50px;
  }
`;
export const NotFoundWrapper = styled.div`
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
    height: auto;
    padding: 0 5px;
  }
`;
export const NotFoundRow = styled.div`
  display: grid;
  grid-auto-columns: minmax(auto, 1fr);
  align-items: center;
  grid-template-areas: ${({ imgStart }) =>
    imgStart ? `'col2 col1'` : `'col1 col2'`};
  @media screen and (max-width: 768px) {
    grid-template-areas: ${({ imgStart }) =>
      imgStart ? `'col2' 'col1'` : `'col1' 'col2'`};
  }
`;
export const Column1 = styled.div`
  padding: 150px 15px;
  grid-area: col1;
  @media screen and (max-width: 480px) {
    padding: 0 15px;
  }
`;
export const Column2 = styled.div`
  padding: 150px 15px;
  grid-area: col2;
  @media screen and (max-width: 480px) {
    padding: 0 15px;
  }
`;
export const TextWrapper = styled.div`
  max-width: 540px;
  padding-top: 0;
`;
export const TopLine = styled.p`
  color: #F7941E;
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  margin-bottom: 16px;
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
  max-width: 440px;
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
    margin-top: 50px;
  }
`;
export const NotFoundImg = styled.img`
  height: 100%
`;
export const NotFoundlogo = styled.a`
  margin-right: 20px;
`;
