import styled from "@emotion/styled";
import { AppBar, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

export const NavAppBar = styled(AppBar)`
  display: flex;
  width: 100%;
  background: #fff;
  min-height: 60px;
  border-bottom: 1px solid #e8ddd4;
  box-shadow: none !important;
`;

export const LeftIcon = styled(IconButton)`
  margin-right: 0;
  color: #1a1a1a;
  padding: 4px 0;
  border-radius: 6px !important;
`;

export const RightNav = styled(Box)`
  & {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
  }
`;

export const NavLink = styled(Link)`
  & {
    background: transparent;
    list-style: none;
    color: #555;
    text-decoration: none;
    padding: 6px 14px;
    height: 34px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    display: flex;
    align-items: center;
    &:hover { background: #f5ede4; color: #1a1a1a; }
  }
`;

export const NavLinkNormal = styled(Link)`
  & {
    display: flex;
    background: transparent;
    list-style: none;
    color: #5c3d2e;
    text-decoration: none;
    padding: 6px 14px;
    border-radius: 6px;
    font-weight: 500;
  }
`;

export const LogoSmall = styled.img`
  height: 32px;
  width: auto;
`;
