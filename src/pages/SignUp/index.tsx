import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { RegisterApi } from "../../api/user-api";
import { AppCSS } from "../../components";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onTapSignup = async () => {
    if (!email || !password || !phone) {
      toast("Please fill in all fields", { type: "error" });
      return;
    }
    setLoading(true);
    const { token, message } = await RegisterApi({ email, phone, password });
    if (token) {
      localStorage.setItem("token", token);
      navigate("/verify");
    } else {
      toast(message || "Registration failed. Please try again.", { type: "error" });
    }
    setLoading(false);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px",
    borderRadius: 12, border: `1.5px solid ${AppCSS.BORDER}`,
    fontSize: 15, outline: "none", background: AppCSS.SURFACE,
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    boxSizing: "border-box", transition: "border 0.2s",
  };

  return (
    <div style={{
      minHeight: "calc(100vh - 68px)", display: "flex",
      background: "linear-gradient(135deg, #F4F2FB 0%, #EDE8FD 100%)",
    }}>
      {/* Left panel */}
      <div style={{
        flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(135deg, #F97316 0%, #6C3CE1 100%)",
        padding: 60,
        clipPath: "polygon(0 0, 88% 0, 100% 100%, 0 100%)",
      }}>
        <div style={{ maxWidth: 380, color: "#fff" }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>✨</div>
          <h1 style={{
            fontSize: "2.4rem", fontWeight: 800, margin: "0 0 16px",
            fontFamily: "'Sora', sans-serif", lineHeight: 1.2,
          }}>
            Join SwiftBazaar today
          </h1>
          <p style={{ fontSize: 16, opacity: 0.88, lineHeight: 1.7, margin: 0 }}>
            Create your account and start shopping the best products. Sellers welcome too — list and sell your products instantly.
          </p>
          <div style={{ marginTop: 32 }}>
            {["✅ Free to join", "✅ Sell your products", "✅ Stripe-secured checkout"].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span style={{ fontSize: 15, color: "rgba(255,255,255,0.9)" }}>{t}</span>
              </div>
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
          }}>Create Account</h2>
          <p style={{ color: AppCSS.GRAY, fontSize: 14, margin: "0 0 32px" }}>
            Already have an account?{" "}
            <button onClick={() => navigate("/login")} style={{
              background: "none", border: "none", color: AppCSS.PRIMARY,
              fontWeight: 700, cursor: "pointer", fontSize: 14, padding: 0,
            }}>Sign in →</button>
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { label: "Email Address", type: "email", value: email, onChange: setEmail, placeholder: "you@example.com" },
              { label: "Phone Number", type: "tel", value: phone, onChange: setPhone, placeholder: "+1 234 567 8900" },
              { label: "Password", type: "password", value: password, onChange: setPassword, placeholder: "••••••••" },
            ].map(field => (
              <div key={field.label}>
                <label style={{ fontSize: 13, fontWeight: 600, color: AppCSS.GRAY_DARK, marginBottom: 6, display: "block" }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={e => field.onChange(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && onTapSignup()}
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = AppCSS.PRIMARY; }}
                  onBlur={e => { e.target.style.borderColor = AppCSS.BORDER; }}
                />
              </div>
            ))}
          </div>

          <button
            onClick={onTapSignup}
            disabled={loading}
            style={{
              width: "100%", marginTop: 28,
              padding: "14px 0", borderRadius: 14,
              background: loading ? AppCSS.GRAY : "linear-gradient(135deg, #F97316 0%, #6C3CE1 100%)",
              color: "#fff", border: "none",
              fontSize: 16, fontWeight: 700, cursor: loading ? "default" : "pointer",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              boxShadow: loading ? "none" : "0 8px 24px rgba(108,60,225,0.3)",
              transition: "all 0.2s",
            }}
          >
            {loading ? "Creating account…" : "Create Account"}
          </button>
          <p style={{ fontSize: 12, color: AppCSS.GRAY, textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
            By signing up you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
