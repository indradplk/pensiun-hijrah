import styled from 'styled-components';
export const VideoContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f9f9f9;

  @media screen and (max-width: 820px) {
    height: 500px;
  }

  @media screen and (max-width: 480px) {
    height: auto;
  }
`;
export const VideoWrapper = styled.div`
  width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 32px;
  padding: 50px 10px;

  @media screen and (max-width: 1024px) {
    max-width: 700px;
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 60px;
  }

  @media screen and (max-width: 820px) {
    grid-template-columns: 1fr 1fr 1fr;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 480px) {
    max-width: 420px;
    grid-template-columns: 1fr;
  }
`;
export const VideoCard = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  width: 350px;
  height: 320px;
  padding: 30px;
`;
export const VideoIcon = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 20px;
`;
export const VideoH1 = styled.h1`
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: 48px;

  @media screen and (max-width: 480px) {
    font-size: 2.3rem;
    padding: 30px;
    margin-bottom: 5px;
  }

  @media screen and (max-width: 820px) {
    font-size: 2rem;
    padding: 50px;
    margin-bottom: 16px;
  }
`;
export const VideoH2 = styled.h2`
  font-size: 18px;
  margin-top: 10px;
  text-align: center;
  color: #212121;
  font-weight: 600;
`;
export const VideoP = styled.p`
  font-size: 1rem;
`;
