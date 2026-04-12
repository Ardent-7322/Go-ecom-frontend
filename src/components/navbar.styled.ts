import styled from "@emotion/styled";
import { AppBar, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

export const NavAppBar = styled(AppBar)`
  display: flex;
  width: 100%;
  background: #ffffff;
  min-height: 68px;
  border-bottom: 1px solid #E8E4F5;
  box-shadow: 0 2px 20px rgba(108, 60, 225, 0.08) !important;
`;

export const LeftIcon = styled(IconButton)`
  margin-right: 0;
  color: #1E1A2E;
  padding: 4px 8px;
  border-radius: 8px !important;

  @media only screen and (min-width: 320px) { margin-left: 1%; }
  @media only screen and (min-width: 480px) { margin-left: 1%; }
  @media only screen and (min-width: 768px) { margin-left: 3%; }
  @media only screen and (min-width: 992px) { margin-left: 6%; }
  @media only screen and (min-width: 1200px) { margin-left: 8%; }
`;

export const RightNav = styled(Box)`
  & {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    padding-right: 5%;
  }
`;

export const NavLink = styled(Link)`
  & {
    background: transparent;
    list-style: none;
    color: #3D3557;
    text-decoration: none;
    padding: 8px 18px;
    height: 38px;
    border-radius: 20px;
    margin-right: 4px;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    transition: all 0.2s;

    &:hover {
      background: #EDE8FD;
      color: #6C3CE1;
    }
  }
`;

export const NavLinkNormal = styled(Link)`
  & {
    display: flex;
    background: transparent;
    list-style: none;
    color: #6C3CE1;
    text-decoration: none;
    padding: 7px 18px;
    border-radius: 8px;
    font-weight: 500;
  }
`;

export const LogoSmall = styled.img`
  height: 38px;
  width: auto;
`;
