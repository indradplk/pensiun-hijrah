import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  background: #f9f9f9;
  height: auto;
  padding: 40px;
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
  @media screen and (max-width: 820px) {
    padding: 20px;
  }
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
  max-width: 600px;
  height: auto;
  width: 100%;
  display: grid;
  margin: 0 auto;
  padding: 60px 48px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 480px) {
    padding: 32px 16px;
  }
`;
export const FormH1 = styled.h1`
  margin-bottom: 20px;
  text-align: center;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 600;
  color: #212121;
  margin-bottom: 40px;
  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;
export const FormH2 = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-size: 16px;
  line-height: 1.2;
  color: #212121;
  margin-bottom: 40px;
  @media screen and (max-width: 480px) {
    font-size: 14px;
    padding: 0 0;
  }
`;
export const FormH3 = styled.h3`
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
  color: #212121;
  @media screen and (max-width: 480px) {
    font-size: 14px;
    padding: 0 0;
  }
`;
export const FormLabel = styled.label`
  margin-bottom: 8px;
  font-size: 14px;
  color: #212121;
`;
export const FormInput = styled.input`
  padding: 8px 8px;
  margin-bottom: 32px;
  border-radius: 4px;
`;
export const FormSelect = styled.select`
  padding: 8px 8px;
  margin-bottom: 32px;
  border-radius: 4px;
  border-width: 2px;
  border-color: light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
`;
export const FormOption = styled.option`
  text-decoration: none;
  margin-bottom: 5px;
  cursor: pointer;
  &:hover {
    background: #FFD098;
    color: #61298A;
  }
`;
export const FormText = styled.textarea`
  rows: 4;
  padding: 8px 8px;
  margin-bottom: 32px;
  border-radius: 4px;
  border-width: 2px;
  border-color: light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
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
  transition: all 0.2 ease-ease-in-out;
  text-decoration: none;
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
  color: #212121;
  font-size: 14px;
  text-align: center;
`;
export const FormInputRight = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.1fr;
`; 
export const FormInputCustomRight = styled.input`
  padding: 8px 8px;
  margin-bottom: 32px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  font-size: 14px;
`;
export const FormSpanRight = styled.span`
  padding: 8px 8px;
  margin-bottom: 32px;
  text-align: center;
  background: #000;
  color: #fff;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  font-size: 14px;
`;