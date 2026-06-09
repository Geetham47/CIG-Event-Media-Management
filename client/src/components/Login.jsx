import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      const data =
        await loginUser({
          email,
          password,
        });

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          data.user
        )
      );

      window.location.href =
        "/dashboard";
    } catch (error) {
      alert("Login Failed");
      console.error(error);
    }
  };

return (
  <form
    onSubmit={handleSubmit}
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    }}
  >
    <h2
      style={{
        textAlign: "center",
        marginBottom: "10px",
      }}
    >
      Welcome Back
    </h2>

    <input
      type="email"
      placeholder="Email Address"
      value={email}
      onChange={(e) =>
        setEmail(e.target.value)
      }
      style={{
        padding: "15px",
        borderRadius: "10px",
        border: "1px solid #ddd",
        fontSize: "16px",
      }}
    />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) =>
        setPassword(e.target.value)
      }
      style={{
        padding: "15px",
        borderRadius: "10px",
        border: "1px solid #ddd",
        fontSize: "16px",
      }}
    />

    <button
      type="submit"
      style={{
        background: "#1877f2",
        color: "white",
        border: "none",
        padding: "15px",
        borderRadius: "10px",
        fontSize: "18px",
        fontWeight: "600",
        cursor: "pointer",
      }}
    >
      Login
    </button>

    <div
      style={{
        textAlign: "center",
      }}
    >
      New User?{" "}
      <Link to="/register">
        Register
      </Link>
    </div>
  </form>
);
}

export default Login;