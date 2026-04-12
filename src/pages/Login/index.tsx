import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { GetProfile, LoginAPI } from "../../api/user-api";
import { UserModel } from "../../types";
import { userLogin } from "../../state/reducers/userSlice";
import { AppCSS } from "../../components";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onTapLogin = async () => {
    if (!email || !password) {
      toast("Please enter email and password!", { type: "error" });
      return;
    }
    setLoading(true);
    const { token, message } = await LoginAPI(email, password);
    if (token) {
      localStorage.setItem("token", token);
      dispatch(userLogin({ token } as UserModel));
      const { user } = await GetProfile(token);
      if (user) dispatch(userLogin({ ...(user as UserModel), token } as UserModel));
      navigate("/");
    } else {
      toast(message || "Login failed. Please check your credentials.", { type: "error" });
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "calc(100vh - 68px)", display: "flex",
      background: "linear-gradient(135deg, #F4F2FB 0%, #EDE8FD 100%)",
    }}>
      {/* Left panel */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        background: AppCSS.GRAD_HERO, padding: 60,
        clipPath: "polygon(0 0, 88% 0, 100% 100%, 0 100%)",
      }}>
        <div style={{ maxWidth: 380, color: "#fff" }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🛍️</div>
          <h1 style={{
            fontSize: "2.4rem", fontWeight: 800, margin: "0 0 16px",
            fontFamily: "'Sora', sans-serif", lineHeight: 1.2,
          }}>
            Welcome back to SwiftBazaar
          </h1>
          <p style={{ fontSize: 16, opacity: 0.85, lineHeight: 1.7, margin: 0 }}>
            Your favourite marketplace for the best deals. Sign in to access your cart, orders and seller dashboard.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
            {["🚚 Free shipping", "🔒 Secure payments", "↩️ Easy returns"].map((t, i) => (
              <span key={i} style={{
                background: "rgba(255,255,255,0.18)", backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.28)",
                color: "#fff", fontSize: 12, fontWeight: 600,
                padding: "6px 14px", borderRadius: 20,
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center",
        justifyContent: "center", padding: 40,
      }}>
        <div style={{
          width: "100%", maxWidth: 420,
          background: "#fff", borderRadius: 24,
          padding: "48px 44px",
          boxShadow: "0 20px 60px rgba(108,60,225,0.12)",
          border: `1px solid ${AppCSS.BORDER}`,
        }}>
          <h2 style={{
            fontSize: "1.8rem", fontWeight: 800, margin: "0 0 6px",
            color: AppCSS.BLACK, fontFamily: "'Sora', sans-serif",
          }}>Sign In</h2>
          <p style={{ color: AppCSS.GRAY, fontSize: 14, margin: "0 0 32px" }}>
            Don't have an account?{" "}
            <button onClick={() => navigate("/signup")} style={{
              background: "none", border: "none", color: AppCSS.PRIMARY,
              fontWeight: 700, cursor: "pointer", fontSize: 14, padding: 0,
            }}>Create one →</button>
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: AppCSS.GRAY_DARK, marginBottom: 6, display: "block" }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: "100%", padding: "12px 16px",
                  borderRadius: 12, border: `1.5px solid ${AppCSS.BORDER}`,
                  fontSize: 15, outline: "none", background: AppCSS.SURFACE,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxSizing: "border-box", transition: "border 0.2s",
                }}
                onFocus={e => { e.target.style.borderColor = AppCSS.PRIMARY; }}
                onBlur={e => { e.target.style.borderColor = AppCSS.BORDER; }}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: AppCSS.GRAY_DARK, marginBottom: 6, display: "block" }}>
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === "Enter" && onTapLogin()}
                style={{
                  width: "100%", padding: "12px 16px",
                  borderRadius: 12, border: `1.5px solid ${AppCSS.BORDER}`,
                  fontSize: 15, outline: "none", background: AppCSS.SURFACE,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  boxSizing: "border-box", transition: "border 0.2s",
                }}
                onFocus={e => { e.target.style.borderColor = AppCSS.PRIMARY; }}
                onBlur={e => { e.target.style.borderColor = AppCSS.BORDER; }}
              />
            </div>
          </div>

          <button
            onClick={onTapLogin}
            disabled={loading}
            style={{
              width: "100%", marginTop: 28,
              padding: "14px 0", borderRadius: 14,
              background: loading ? AppCSS.GRAY : AppCSS.GRAD_PRIMARY,
              color: "#fff", border: "none",
              fontSize: 16, fontWeight: 700, cursor: loading ? "default" : "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              boxShadow: loading ? "none" : "0 8px 24px rgba(108,60,225,0.35)",
              transition: "all 0.2s",
            }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
