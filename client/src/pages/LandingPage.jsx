import { Link } from "react-router-dom";
import Login from "../components/Login";
import galleryImage from "../assets/gallery-wall.png";
import cigLogo from "../assets/cig-logo.png";

function LandingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f2f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "80px",
          alignItems: "center",
        }}
      >
        {/* LEFT SIDE */}

        <div>
          <img
            src={galleryImage}
            alt="Gallery"
            style={{
              width: "100%",
              maxWidth: "700px",
              borderRadius: "20px",
              marginBottom: "30px",
              boxShadow:
                "0 20px 50px rgba(0,0,0,0.15)",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <img
              src={cigLogo}
              alt="CIG Logo"
              style={{
                width: "90px",
              }}
            />

            <h1
              style={{
                fontSize: "64px",
                color: "#1877f2",
                fontWeight: "800",
                margin: 0,
              }}
            >
              CIG Gallery
            </h1>
          </div>

          <p
            style={{
              fontSize: "28px",
              color: "#1c1e21",
              lineHeight: "1.5",
              maxWidth: "700px",
            }}
          >
            Capture Memories.
            <br />
            Share Experiences.
            <br />
            Preserve Every Event.
          </p>
        </div>

        {/* RIGHT SIDE */}

        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "20px",
            boxShadow:
              "0 20px 40px rgba(0,0,0,0.12)",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontSize: "22px",
              fontWeight: "600",
              color: "#1c1e21",
              marginBottom: "30px",
              lineHeight: "1.6",
            }}
          >
            Every Event Tells a Story.
            <br />
            Every Memory Deserves a Home.
          </p>

          <Login />

          <div
            style={{
              textAlign: "center",
              marginTop: "25px",
            }}
          >
            <Link to="/register">
              <button
                style={{
                  background: "#42b72a",
                  color: "white",
                  border: "none",
                  padding: "14px 28px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Create New Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;