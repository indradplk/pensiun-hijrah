import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { Link as LinkR } from 'react-router-dom';
export const SidebarContainer = styled.div`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #010101;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  overflow-y: auto; 
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? '100%' : '0%')};
  top: ${({ isOpen }) => (isOpen ? '0%' : '-100%')};
`;
export const CloseIcon = styled(FaTimes)`
  color: #fff;
`;
export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`;
export const SidebarWrapper = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 80px 20px;
`;
export const SidebarMenu = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  align-items: flex-start;
  padding: 10px;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
  color: #fff;
`;
export const SidebarSubMenu = styled.ul`
  padding-left: 0;
  grid-template-rows: repeat(5, 80px);
`;
export const Heading = styled.h1`
  font-size: 16px;
  margin-bottom: 16px;
`;
export const SidebarLink = styled(LinkR)`
  display: flex;
  font-size: 14px;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  color: #fff;
  cursor: pointer;
  margin-bottom: 10px;
`;
export const SideBtnWrap = styled.div`
  display: flex;
  justify-content: center;
`;
export const SidebarRoute = styled(LinkR)`
  border-radius: 50px;
  background: #01bf71;
  white-space: nowrap;
  padding: 16px 64px;
  color: #fff;
  outline: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  text-decoration: none;
`;