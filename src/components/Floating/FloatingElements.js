import styled from 'styled-components';

export const FloatingButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
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
