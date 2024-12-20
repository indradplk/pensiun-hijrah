import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
export const Nav = styled.nav`
  background: linear-gradient(
    108deg,
    #D7A1FF 0%,
    #61298A 100%
  );
  height: 80px;
  margin-top: -80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 1024px) {
    font-size: 12px;
  }

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }

  @media screen and (max-width: 480px) {
  justify-content: flex-start;
  }
`;
export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 0;
  width: auto;

  @media screen and (max-width: 480px) {
    padding: 0 5px;
  }
`;
export const Navlogo = styled(LinkR)`
  color: #fff;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  font-weight: bold;
  text-decoration: none;
  margin-right: 40px;

  @media screen and (max-width: 1024px) {
    margin-right: auto;
  }

  @media screen and (max-width: 480px) {
    margin-left: 20px;
  }
`;
export const MobileIcons = styled.div`
  display: none;
  @media screen and (max-width: 853px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 40%);
    font-size: 1.8rem;
    cursor: pointer;
    color: #fff;
  }
`;
export const NavMenu = styled.ul`
  color: #fff;
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  @media screen and (max-width: 853px) {
    display: none;
  }
`;
export const NavItems = styled.li`
  height: 10px;
  margin-right: 40px;
  @media screen and (max-width: 1024px) {
    height: 0;
    margin-right: 20px;
  }
`;
export const NavLinks = styled(LinkR)`
  color: #212121;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  margin-bottom: 5px;
  width: 260px;
  cursor: pointer;
  &:hover {
    background: #FFD098;
    color: #61298A;
  }
  position: relative;
`;
export const NavLinkS = styled.a`
  color: #212121;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  margin-bottom: 5px;
  width: 260px;
  cursor: pointer;
  &:hover {
    background: #FFD098;
    color: #61298A;
  }
`;
export const SubMenu = styled.nav`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 100%;
  padding: 2px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
`;
export const SubMenuItem = styled(LinkR)`
  padding: 2px 1rem;
  color: #000;
  text-decoration: none;
  width: 260px;
  &:hover {
    background: #FFD098;
    color: #61298A;
  }
`;
export const NavBtn = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  align-items: center;
  @media screen and (max-width: 1024px) {
    margin-left: auto;
  }
  @media screen and (max-width: 853px) {
    display: none;
  }
`;
export const NavBtnLink = styled(LinkR)`
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
  padding: 10px 22px;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
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
  height: 60%;
`;