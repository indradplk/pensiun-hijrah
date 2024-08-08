import styled from 'styled-components';

export const ManagementContainer = styled.div`
  height: auto;
  color: #212121;
  padding: 50px 0;
  background: #f9f9f9;
  @media screen and (max-width: 1024px) {
    padding: 20px 50px;
  }
  @media screen and (max-width: 820px) {
    padding: 10px 30px;
  }
  @media screen and (max-width: 480px) {
    padding: 10px 30px;
  }
`;
export const ManagementWrapper = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  align-items: start;
  grid-gap: 32px;
  padding: 0 50px;

  @media screen and (max-width: 1024px) {
    max-width: 700px;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 60px;
  }

  @media screen and (max-width: 820px) {
    width: auto;
    grid-template-columns: 1fr;
    padding: 0 0;
  }
  @media screen and (max-width: 480px) {
    width: auto;
    grid-template-columns: 1fr;
    padding: 0 0;
  }
`;
export const ManagementCardWrapper = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  align-items: start;
  grid-gap: 32px;

  @media screen and (max-width: 1024px) {
    max-width: 700px;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 60px;
  }

  @media screen and (max-width: 820px) {
    width: auto;
    grid-template-columns: 1fr;
    grid-gap: 32px;
  }
  @media screen and (max-width: 480px) {
    width: auto;
    grid-template-columns: 1fr;
    grid-gap: 21px;
  }
`;
export const ManagementCardTextWrapper = styled.div`
  margin: 0 auto;
  display: column;
  grid-template-columns: 1fr;
  align-items: start;
  grid-gap: 10px;
  width: 450px;
  @media screen and (max-width: 820px) {
    width: auto;
  }
  @media screen and (max-width: 480px) {
    width: auto;
  }
`;
export const Column1 = styled.div`
  padding: 0 25px;
  width: 300px;
  @media screen and (max-width: 820px) {
    padding: 0 0;
    width: auto;
  }
  @media screen and (max-width: 480px) {
    padding: 0 0;
    width: auto;
  }
`;
export const Column2 = styled.div`
  padding: 0 15px;
  @media screen and (max-width: 820px) {
    padding: 0 5px;
    width: auto;
  }
  @media screen and (max-width: 480px) {
    padding: 0 5px;
    width: auto;
  }
`;
export const TextWrapper = styled.div`
  max-width: 600px;
  padding-top: 0;
  padding-bottom: 0;
`;
export const TopLine = styled.p`
  font-size: 16px;
  text-align: justify;
`;
export const Heading = styled.h1`
  margin-bottom: 12px;
  font-size: 42px;
  line-height: 1.1;
  font-weight: 600;
  color: '#f7f8fa';
  @media screen and (max-width: 480px) {
    font-size: 24px;
    width: 300px;
  }
`;
export const ManagementH2 = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: '#f7f8fa';
  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`;
export const Subtitle = styled.p`
  font-size: 18px;
  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
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
`;
export const NavItems = styled.div`
  width: 250px;
  height: 50px;
  @media screen and (max-width: 820px) {
    width: auto;
  }
  @media screen and (max-width: 480px) {
    width: auto;
  }
`;
export const ManagementCard1 = styled.div`
  background: #fff;
  display: flex;
  flex-direction: grid;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  height: auto;
  padding: 25px;
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

  @media screen and (max-width: 820px) {
    display: flex;
    flex-direction: grid;
    justify-content: flex-start;
    align-items: center;
    padding: 25px;
    grid-gap: 20px;
    height: auto;
  }

  @media screen and (max-width: 480px) {
    display: grid;
    justify-content: flex-start;
    justify-items: center;
    width: auto;
    height: auto;
    padding: 20px;
    grid-gap: 20px;
  }
`;
export const ManagementCard2 = styled.div`
  background: #fff;
  display: flex;
  flex-direction: grid;
  justify-content: flex-start;
  align-items: start;
  border-radius: 10px;
  height: auto;
  padding: 25px;
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

  @media screen and (max-width: 820px) {
    display: flex;
    flex-direction: grid;
    justify-content: flex-start;
    align-items: center;
    padding: 25px;
    grid-gap: 20px;
    height: auto;
  }

  @media screen and (max-width: 480px) {
    display: grid;
    justify-content: flex-start;
    justify-items: center;
    width: auto;
    height: auto;
    padding: 20px;
    grid-gap: 20px;
  }
`;
export const ManagementIcon = styled.img`
  height: 180px;
  border-radius: 200px;
`;
