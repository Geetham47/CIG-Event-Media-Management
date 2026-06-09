import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      role: "viewer",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);

      alert(
        "Registration Successful"
      );

      navigate("/login");
    } catch (error) {
      console.error(error);

      alert(
        "Registration Failed"
      );
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "16px",
    fontSize: "16px",
    borderRadius: "12px",
    border: "1px solid #dcdfe3",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        width: "100%",
      }}
    >
      <input
        type="text"
        placeholder="Full Name"
        style={inputStyle}
        onChange={(e) =>
          setFormData({
            ...formData,
            name: e.target.value,
          })
        }
      />

      <input
        type="email"
        placeholder="Email Address"
        style={inputStyle}
        onChange={(e) =>
          setFormData({
            ...formData,
            email: e.target.value,
          })
        }
      />

      <input
        type="password"
        placeholder="Password"
        style={inputStyle}
        onChange={(e) =>
          setFormData({
            ...formData,
            password:
              e.target.value,
          })
        }
      />

      <select
        style={inputStyle}
        onChange={(e) =>
          setFormData({
            ...formData,
            role: e.target.value,
          })
        }
      >
        <option value="viewer">
          Viewer
        </option>

        <option value="member">
          Member
        </option>

        <option value="photographer">
          Photographer
        </option>
      </select>

      <button
        type="submit"
        style={{
          width: "100%",
          padding: "16px",
          border: "none",
          borderRadius: "12px",
          background: "#42b72a",
          color: "white",
          fontSize: "20px",
          fontWeight: "600",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Create Account
      </button>

      <div
        style={{
          textAlign: "center",
          marginTop: "10px",
          fontSize: "18px",
        }}
      >
        Already have an account?{" "}
        <Link to="/login">
          Log In
        </Link>
      </div>
    </form>
  );
}

export default Register;