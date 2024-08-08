import styled from 'styled-components';
export const CarouselImg = styled.img`
  width: 100%;
  height: 500px;
  -o-object-fit: cover;
  object-fit: cover;
  background: #fff;
  margin-top: 80px;
  @media screen and (max-width: 480px) {
    height: 400px;
  }
`;
