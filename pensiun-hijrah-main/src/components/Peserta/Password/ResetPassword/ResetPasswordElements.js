import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  background: #f9f9f9;
  height: auto;
  @media screen and (max-width: 1024px) {
    padding: 20px 50px;
  }
  @media screen and (max-width: 820px) {
    padding: 40px 0;
  }
`;
export const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
`;
export const Icon = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  font-size: 32px;
  text-align: center;
`;
export const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 480px) {
    padding: 10px;
  }
`;
export const Form = styled.form`
  background-color: #fff;
  max-width: 400px;
  height: auto;
  width: 100%;
  display: grid;
  margin: 0 auto;
  padding: 60px 32px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 480px) {
    padding: 32px 18px;
  }
`;
export const FormH1 = styled.h1`
  margin-bottom: 20px;
  color: #010101;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`;
export const FormLabel = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  color: #010101;
`;
export const FormInput = styled.input`
  padding: 16px 16px;
  margin-bottom: 32px;
  border-radius: 4px;
`;
export const FormButton = styled.button`
  background: linear-gradient(
    157.81deg,
    #FFF2E2 -43.27%,
    #FFEAD0 -21.24%,
    #FFDEB8 12.19%,
    #FECC92 29.82%,
    #FCB45F 51.94%,
    #F7941E 90.29%
  );
  padding: 16px 0;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    transition: all 0.2 ease-in-out;
    background: linear-gradient(
      157.81deg,
      #F6FFEE -43.27%,
      #ECFFDB -21.24%,
      #DBFCBD 12.19%,
      #BEF48D 29.82%,
      #A3E169 51.94%,
      #80C342 90.29%
    );
    color: #61298A;
  }
`;
export const NavIcon = styled.img`
  height: 50%;
`;
export const Text = styled(Link)`
  margin-top: 24px;
  color: #010101;
  font-size: 14px;
  text-align: center;
`;