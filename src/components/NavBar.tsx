/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { Toolbar, Typography, Button, IconButton } from "@mui/material";
import {
  LeftIcon,
  NavAppBar,
  NavLink,
  RightNav,
} from "./navbar.styled";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CartIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useEffect } from "react";
import { AppCSS, TxtSearch } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../state/hooks";
import { userLogin } from "../state/reducers/userSlice";
import { UserModel } from "../types";
import { GetProfile } from "../api/user-api";

// ── Inline SVG Logo ──────────────────────────────────────────────────────────
const BrandLogo: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <svg width={size * 3.2} height={size} viewBox="0 0 160 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Icon mark */}
    <rect x="0" y="4" width="36" height="36" rx="10" fill="url(#grad1)" />
    <path d="M18 12 L26 18 L18 24 L10 18 Z" fill="white" opacity="0.9"/>
    <path d="M10 18 L18 24 L18 32 L10 26 Z" fill="white" opacity="0.6"/>
    <path d="M26 18 L18 24 L18 32 L26 26 Z" fill="white" opacity="0.75"/>
    {/* Brand name */}
    <text x="46" y="20" fontFamily="'Sora', 'Plus Jakarta Sans', sans-serif" fontWeight="800" fontSize="16" fill="#1E1A2E">SWIFT</text>
    <text x="46" y="38" fontFamily="'Sora', 'Plus Jakarta Sans', sans-serif" fontWeight="400" fontSize="13" fill="#6C3CE1" letterSpacing="3">BAZAAR</text>
    <defs>
      <linearGradient id="grad1" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6C3CE1"/>
        <stop offset="100%" stopColor="#3B82F6"/>
      </linearGradient>
    </defs>
  </svg>
);

interface NavItemProps {
  title?: string;
  linkTo?: string;
  selected?: boolean;
  onClick?: Function;
  id?: string;
}

export const NavItem: React.FC<NavItemProps> = ({ title, linkTo, selected }) => {
  return (
    <NavLink
      style={{ border: selected ? "1px solid #E8E4F5" : "none" }}
      to={linkTo ? linkTo : "#"}
    >
      {title && title}
    </NavLink>
  );
};

interface ProfileProps {
  userType: string;
}

export const ProfileMenu: React.FC<ProfileProps> = ({ userType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useAppSelector((state) => state.userReducer.userProfile);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const sellerOptions = () => {
    const type = userType?.toLowerCase();
    if (type === "buyer") {
      return (
        <MenuItem onClick={() => { handleClose(); navigate("/seller-program"); }}
          sx={{ fontSize: 14, gap: 1 }}>
          🏪 Join Seller Program
        </MenuItem>
      );
    } else if (type === "seller") {
      return (
        <MenuItem onClick={() => { handleClose(); navigate("/manage-products"); }}
          sx={{ fontSize: 14, gap: 1 }}>
          📦 Manage Products
        </MenuItem>
      );
    }
    return <></>;
  };

  const displayName = profile?.first_name
    ? profile.first_name
    : profile?.email?.split("@")[0] || "Account";

  return (
    <div>
      <Button
        onClick={handleClick}
        sx={{
          background: open ? AppCSS.PRIMARY_LIGHT : "transparent",
          color: AppCSS.GRAY_DARK,
          borderRadius: "24px",
          padding: "6px 14px",
          textTransform: "none",
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          border: `1px solid ${open ? AppCSS.PRIMARY : AppCSS.BORDER}`,
          "&:hover": { background: AppCSS.PRIMARY_LIGHT, borderColor: AppCSS.PRIMARY },
          display: "flex", alignItems: "center", gap: "6px",
        }}
      >
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: AppCSS.GRAD_PRIMARY,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: 12, fontWeight: 700,
        }}>
          {displayName[0]?.toUpperCase()}
        </div>
        {displayName}
        <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1, borderRadius: "12px", minWidth: 200,
            boxShadow: "0 8px 32px rgba(108,60,225,0.15)",
            border: `1px solid ${AppCSS.BORDER}`,
          }
        }}
      >
        <MenuItem onClick={() => { handleClose(); navigate("/profile"); }}
          sx={{ fontSize: 14, gap: 1, py: 1.2 }}>
          👤 My Profile
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); navigate("/orders"); }}
          sx={{ fontSize: 14, gap: 1, py: 1.2 }}>
          📋 My Orders
        </MenuItem>
        {sellerOptions()}
        <MenuItem
          onClick={() => {
            localStorage.clear();
            dispatch(userLogin({} as UserModel));
            handleClose();
            navigate("/");
          }}
          sx={{ fontSize: 14, gap: 1, py: 1.2, color: AppCSS.DANGER, borderTop: `1px solid ${AppCSS.BORDER}`, mt: 0.5 }}
        >
          🚪 Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useAppSelector((state) => state.userReducer.userProfile);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const { user } = await GetProfile(token);
      if (user) dispatch(userLogin(user as UserModel));
    }
  };

  const handleOpen = (e: any) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const guestMenu = () => (
    <RightNav>
      <Link to="/cart">
        <IconButton sx={{
          borderRadius: "20px", px: 2, py: 0.8,
          border: `1px solid ${AppCSS.BORDER}`,
          color: AppCSS.GRAY_DARK,
          "&:hover": { background: AppCSS.PRIMARY_LIGHT, color: AppCSS.PRIMARY, borderColor: AppCSS.PRIMARY },
        }}>
          <CartIcon sx={{ fontSize: 20 }} />
          <span style={{ fontSize: 14, fontWeight: 500, marginLeft: 6 }}>Cart</span>
        </IconButton>
      </Link>

      <Button
        onClick={handleOpen}
        sx={{
          background: AppCSS.GRAD_PRIMARY,
          color: "#fff",
          borderRadius: "24px",
          px: 2.5,
          py: 0.8,
          textTransform: "none",
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          boxShadow: "0 4px 14px rgba(108,60,225,0.35)",
          "&:hover": { boxShadow: "0 6px 20px rgba(108,60,225,0.45)", transform: "translateY(-1px)" },
          display: "flex", alignItems: "center", gap: "6px",
        }}
      >
        <PersonIcon sx={{ fontSize: 18 }} />
        Sign In
      </Button>

      <Menu
        anchorEl={anchorEl} open={open} onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1, borderRadius: "12px", minWidth: 200,
            boxShadow: "0 8px 32px rgba(108,60,225,0.15)",
            border: `1px solid ${AppCSS.BORDER}`,
          }
        }}
      >
        <MenuItem onClick={() => { handleClose(); navigate("/login"); }}
          sx={{ fontSize: 14, gap: 1, py: 1.2 }}>
          🔑 Login
        </MenuItem>
        <MenuItem onClick={() => { handleClose(); navigate("/signup"); }}
          sx={{ fontSize: 14, gap: 1, py: 1.2, fontWeight: 600, color: AppCSS.PRIMARY }}>
          ✨ Create Account
        </MenuItem>
      </Menu>
    </RightNav>
  );

  const authMenu = () => (
    <RightNav>
      <Link to="/cart">
        <IconButton sx={{
          borderRadius: "20px", px: 2, py: 0.8,
          border: `1px solid ${AppCSS.BORDER}`,
          color: AppCSS.GRAY_DARK,
          "&:hover": { background: AppCSS.PRIMARY_LIGHT, color: AppCSS.PRIMARY, borderColor: AppCSS.PRIMARY },
        }}>
          <CartIcon sx={{ fontSize: 20 }} />
          <span style={{ fontSize: 14, fontWeight: 500, marginLeft: 6 }}>Cart</span>
        </IconButton>
      </Link>
      <ProfileMenu userType={profile?.user_type || ""} />
    </RightNav>
  );

  return (
    <NavAppBar position="sticky" elevation={0}>
      <Toolbar sx={{ minHeight: "68px !important", px: 0 }}>
        {/* Logo */}
        <LeftIcon size="large" edge="start" aria-label="home" onClick={() => navigate("/")}>
          <BrandLogo size={36} />
        </LeftIcon>

        {/* Search */}
        <div style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          maxWidth: 520,
          margin: "0 auto",
        }}>
          <TxtSearch onChange={() => {}} placeholder="Search products…" />
        </div>

        <Typography component="div" sx={{ flexGrow: 1 }} />

        {profile?.id ? authMenu() : guestMenu()}
      </Toolbar>
    </NavAppBar>
  );
};
