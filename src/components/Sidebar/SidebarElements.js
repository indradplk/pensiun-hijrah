import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { Link as LinkR } from 'react-router-dom';
export const SidebarContainer = styled.div`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #f9f9f9;
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
  color: #F7941E;
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
  color: #212121;
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
  color: #212121;
  cursor: pointer;
  margin-bottom: 10px;
`;
export const SideBtnWrap = styled.div`
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  grid-gap: 20px;
  padding: 10px;
`;
export const SidebarRoute1 = styled(LinkR)`
  border-radius: 8px;
  background: linear-gradient(
    108deg,
    #D7A1FF 0%,
    #61298A 100%
  );
  white-space: nowrap;
  padding: 12px 22px;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2 ease-ease-in-out;
  text-decoration: none;
  text-align: center;
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
export const SidebarRoute2 = styled(LinkR)`
  border-radius: 8px;
  background: linear-gradient(
    157.81deg,
    #FFF2E2 -43.27%,
    #FFEAD0 -21.24%,
    #FFDEB8 12.19%,
    #FECC92 29.82%,
    #FCB45F 51.94%,
    #F7941E 90.29%
  );
  white-space: nowrap;
  padding: 12px 22px;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2 ease-ease-in-out;
  text-decoration: none;
  text-align: center;
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
