import styled from 'styled-components';

export const TimelineContainer = styled.div`
  color: #fff;
  background: #f9f9f9;
  @media screen and (max-width: 480px) {
    padding: 20px 0;
    height: 1700px;
  }
  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
  @media screen and (max-width: 1024px) {
    padding: 20px 50px;
  }
`;
export const TimelineWrapper = styled.div`
  width: 950px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-gap: 32px;
  padding: 0 50px;

  @media screen and (max-width: 1000px) {
    max-width: 700px;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 60px;
  }

  @media screen and (max-width: 786px) {
    grid-template-columns: 1fr 1fr;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 480px) {
    width: auto;
    grid-template-columns: 1fr;
    padding: 0 0;
    justify-items: start
  }
`;
export const TimelineRow = styled.div`
  display: grid;
  align-items: center;
  height: 1300px;

  @media screen and (max-width: 480px) {
    height: auto;
    width: auto;
  }
`;
export const Heading = styled.h1`
  font-size: 2.5rem;
  color: #212121;
  line-height: 1.3;
  font-weight: 600;

  @media screen and (max-width: 786px) {
    font-size: 2rem;
    padding: 50px;
    margin-bottom: 16px;
  }

  @media screen and (max-width: 480px) {
    font-size: 2rem;
    padding: 5px;
    margin-bottom: 5px;
    margin-top: 20px;
  }
`;
export const Subtitle = styled.p`
  max-width: 500px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  color: #212121;
`;
