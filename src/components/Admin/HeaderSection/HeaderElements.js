import styled from 'styled-components';
export const HeaderImg = styled.img`
  width: 100%;
  height: 250px;
  -o-object-fit: cover;
  object-fit: cover;
  background: #fff;
  margin-top: 80px;
  @media screen and (max-width: 480px) {
    margin-top: 0;
  }
`;
export const Heading = styled.div`
  position: absolute;
  margin-top: 150px;
  margin-left: 150px;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 600;
  color: #fff;

  @media screen and (max-width: 820px) {
    margin-top: 130px;
    margin-left: 80px;
  }

  @media screen and (max-width: 480px) {
    font-size: 28px;
    margin-top: 80px;
    margin-left: 20px;
    padding: 10px;
    width: 300px;
  }
`;
export const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  justify-content: left;

  @media screen and (max-width: 1024px) {
    height: auto;
    margin-top: auto;
  }

  @media screen and (max-width: 820px) {
    height: auto;
    margin-top: auto;
  }

  @media screen and (max-width: 480px) {
    height: auto;
    margin-top: auto;
  }
`;
