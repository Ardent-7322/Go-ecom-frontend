/* eslint-disable react-hooks/exhaustive-deps */
import { Toolbar, Typography, Button, IconButton } from "@mui/material";
import { LeftIcon, NavAppBar, NavLink, RightNav } from "./navbar.styled";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CartIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useEffect } from "react";
import { TxtSearch } from "./index";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../state/hooks";
import { userLogin } from "../state/reducers/userSlice";
import { UserModel } from "../types";
import { GetProfile } from "../api/user-api";

interface NavItemProps { title?: string; linkTo?: string; selected?: boolean; }
export const NavItem: React.FC<NavItemProps> = ({ title, linkTo, selected }) => (
  <NavLink style={{ border: selected ? "1px solid #e8ddd4" : "none" }} to={linkTo || "#"}>
    {title}
  </NavLink>
);

export const ProfileMenu: React.FC<{ userType: string }> = ({ userType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useAppSelector((state) => state.userReducer.userProfile);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const displayName = profile?.first_name
    ? profile.first_name
    : profile?.email?.split("@")[0] || "Account";

  return (
    <div>
      <Button onClick={(e) => setAnchorEl(e.currentTarget)} sx={{
        color: "#1a1a1a", borderRadius: "6px", padding: "6px 14px",
        textTransform: "none", fontSize: 13, fontWeight: 500,
        fontFamily: "Inter, sans-serif",
        border: "1px solid #e8ddd4", background: open ? "#f5ede4" : "#fff",
        "&:hover": { background: "#f5ede4" },
        display: "flex", alignItems: "center", gap: "6px",
      }}>
        <div style={{
          width: 24, height: 24, borderRadius: "50%", background: "#5c3d2e",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: 11, fontWeight: 600,
        }}>
          {displayName[0]?.toUpperCase()}
        </div>
        {displayName}
        <KeyboardArrowDownIcon sx={{ fontSize: 15 }} />
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}
        PaperProps={{ sx: { mt: 1, borderRadius: "8px", minWidth: 180, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", border: "1px solid #e8ddd4" } }}>
        <MenuItem onClick={() => { setAnchorEl(null); navigate("/profile"); }} sx={{ fontSize: 13, py: 1.2, color: "#333" }}>Profile</MenuItem>
        <MenuItem onClick={() => { setAnchorEl(null); navigate("/orders"); }} sx={{ fontSize: 13, py: 1.2, color: "#333" }}>My Orders</MenuItem>
        {userType?.toLowerCase() === "buyer" && (
          <MenuItem onClick={() => { setAnchorEl(null); navigate("/seller-program"); }} sx={{ fontSize: 13, py: 1.2, color: "#333" }}>Become a Seller</MenuItem>
        )}
        {userType?.toLowerCase() === "seller" && (
          <MenuItem onClick={() => { setAnchorEl(null); navigate("/manage-products"); }} sx={{ fontSize: 13, py: 1.2, color: "#333" }}>Manage Products</MenuItem>
        )}
        <MenuItem onClick={() => { localStorage.clear(); dispatch(userLogin({} as UserModel)); setAnchorEl(null); navigate("/"); }}
          sx={{ fontSize: 13, py: 1.2, color: "#c0392b", borderTop: "1px solid #f0e8e0", mt: 0.5 }}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useAppSelector((state) => state.userReducer.userProfile);
  const authToken = profile?.token || localStorage.getItem("token") || "";

  useEffect(() => { fetchProfile(); }, []);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const { user } = await GetProfile(token);
      if (user) dispatch(userLogin({ ...(user as UserModel), token } as UserModel));
    }
  };

  return (
    <NavAppBar position="sticky" elevation={0}>
      <Toolbar sx={{ minHeight: "60px !important", px: 3 }}>
        <div onClick={() => navigate("/")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginRight: 32 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: "#5c3d2e", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 12, height: 12, background: "#fff", borderRadius: 2 }} />
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.3px" }}>Swift Bazaar</span>
        </div>

        <div style={{ flex: 1, maxWidth: 440 }}>
          <TxtSearch onChange={() => {}} placeholder="Search products..." />
        </div>

        <Typography component="div" sx={{ flexGrow: 1 }} />

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link to="/cart">
            <IconButton sx={{ borderRadius: "6px", px: 1.5, py: 0.8, border: "1px solid #e8ddd4", color: "#1a1a1a", background: "#fff", "&:hover": { background: "#f5ede4" } }}>
              <CartIcon sx={{ fontSize: 18 }} />
              <span style={{ fontSize: 13, fontWeight: 500, marginLeft: 5 }}>Cart</span>
            </IconButton>
          </Link>

          {authToken ? (
            <ProfileMenu userType={profile?.user_type || ""} />
          ) : (
            <Button onClick={() => navigate("/login")} sx={{
              background: "#5c3d2e", color: "#fff", borderRadius: "6px", px: 2, py: 0.8,
              textTransform: "none", fontSize: 13, fontWeight: 500, fontFamily: "Inter, sans-serif",
              "&:hover": { background: "#3d2818" },
              display: "flex", alignItems: "center", gap: "6px",
            }}>
              <PersonIcon sx={{ fontSize: 16 }} />
              Sign In
            </Button>
          )}
        </div>
      </Toolbar>
    </NavAppBar>
  );
};
