import styled from 'styled-components';

export const FloatingContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  z-index: 1000;
`;

export const FloatingMainButton = styled.div`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover { 
    transform: scale(1.1); 
    background-color: #0056b3;
  } 
`;

export const FloatingBackButton = styled.div`
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
`;

export const FloatingButton = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
`;

export const IconButton = styled.a` 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  width: 50px; 
  height: 50px; 
  background-color: #25d366;
  color: white; 
  border-radius: 50%; 
  text-decoration: none; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  transition: transform 0.3s; 
  
  &:hover { 
    transform: scale(1.1); 
  } 
`; 

export const EmailButton = styled(IconButton)` 
  background-color: #0072c6;
`;

export const FacebookButton = styled(IconButton)` 
  background-color: #3b5998;
`;

export const YtbButton = styled(IconButton)` 
  background-color: #FF0000;
`;
