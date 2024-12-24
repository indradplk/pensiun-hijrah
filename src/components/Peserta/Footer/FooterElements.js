import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FooterContainer = styled.footer`
  background-color: #fff;
`;

export const FooterWrap = styled.div`
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;

  @media screen and (max-width: 820px) {
    max-width: auto;
  }
`;
export const FooterLinkContainer = styled.div`
  display: flex;

  @media screen and (max-width: 820px) {
    justify-content: center;
    flex-direction: row;
    flex-wrap: nowrap;
  }
`;
export const FindUsContainer = styled.div`
  display: flex;
`;
export const FooterLinkWrapper = styled.div`
  display: flex;

  @media screen and (max-width: 820px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;
export const FindUsWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 820px) {
    flex-direction: column;
    margin-bottom: 0px;
    width: auto;
  }
`;
export const FooterLinkItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 16px;
  text-align: left;
  box-sizing: border-box;
  color: #1E1E1E;

  @media screen and (max-width: 820px) {
    margin: 0;
    padding: 10px;
    width: 100%;
  }
`;
export const FindUsColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  box-sizing: border-box;

  @media screen and (max-width: 480px) {
    margin: 0;
    width: 100%;
  }
`;
export const Heading = styled.h1`
  margin-bottom: 12px;
  font-size: 24px;
  line-height: 1.1;
  font-weight: 600;
  color: #212121;
  @media screen and (max-width: 480px) {
    font-size: 18px;
  }
`;
export const FooterLinkTitle = styled.h1`
  font-size: 14px;
  margin-bottom: 16px;
`;
export const FooterLink = styled(Link)`
  color: #1E1E1E;
  text-decoration: none;
  margin-bottom: 0.5rem;
  font-size: 14px;

  &:hover {
    color: #61298A;
    transition: 0.3s ease-in-out;
  }
`;
export const SocialMedia = styled.section`
  align-item: center;
  width: 100%;
  font-size: 14px;
`;
export const SocialMediaWrap = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px auto 0 auto;

  @media screen and (max-width: 820px) {
    flex-direction: column;
    width: auto;
  }
`;
export const SocialLogo = styled(Link)`
  color: #1E1E1E;
  justify-self: start;
  margin-left: -40px;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  font-weight: bold;
  transition: 0.3s ease-in-out;

  @media screen and (max-width: 820px) {
    margin-left: 0px;
    margin-bottom: 16px;
  }

  &:hover {
    color: #61298A;
    transition: 0.3s ease-in-out;
  }
`;
export const SocialLogoIcon = styled.img`
  width: 80%;
  margin-bottom: 16px;

  @media screen and (max-width: 820px) {
    width: 95%;
    margin-bottom: 8px;
  }
`;
export const WebsiteRights = styled.small`
  color: #1E1E1E;
  text-align: center;
`;
export const SocialIcons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 240px;
`;
export const SocialIconsColumn = styled.div`
  display: flex;
  flex-direction: row;
  width: 400px;
  margin-top: -5px;
  margin-right: 80px;

  @media screen and (max-width: 853px) {
    margin-right: 0;
  }

  @media screen and (max-width: 480px) {
    width: 100%;
    margin-top: 0;
    margin-right: 0;
  }
`;
export const SocialIconLink = styled.a`
  color: #1E1E1E;
  font-size: 24px;
  transition: 0.3s ease-in-out;
  &:hover {
    color: #61298A;
    transition: 0.3s ease-in-out;
  }
`;
