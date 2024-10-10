import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom';
export const Nav = styled.nav`
  background: #010101;
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

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;
export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 0;
  width: 100%;
  padding: 0 120px;

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
  margin-left: 24px;
  font-weight: bold;
  text-decoration: none;
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
  margin-right: -22px;
  @media screen and (max-width: 853px) {
    display: none;
  }
`;
export const NavItems = styled.li`
  height: 10px;
  margin-right: 40px;
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
    background: #92E3A9;
    color: #fff;
  }
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
    background: #92E3A9;
    color: #fff;
  }
`;
export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  @media screen and (max-width: 853px) {
    display: none;
  }
`;
export const NavBtnLink = styled(LinkR)`
  border-radius: 50px;
  background: #01bf71;
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
    background: #fff;
    color: #010101;
  }
`;
export const NavIcon = styled.img`
  height: 50%;
`;