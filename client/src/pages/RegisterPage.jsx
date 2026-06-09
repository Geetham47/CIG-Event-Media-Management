import Register from "../components/Register";
import museumImage from "../assets/museum.png";
import logo from "../assets/cig-logo.png";

function RegisterPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f2f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1400px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "center",
        }}
      >
        {/* LEFT SECTION */}

        <div>
          <img
            src={museumImage}
            alt="Museum"
            style={{
              width: "100%",
              maxWidth: "650px",
              height: "260px",
              objectFit: "cover",
              borderRadius: "20px",
              marginBottom: "25px",
              boxShadow:
                "0 15px 40px rgba(0,0,0,0.15)",
            }}
          />

          <img
            src={logo}
            alt="CIG Logo"
            style={{
              width: "100px",
              marginBottom: "20px",
            }}
          />

          <h1
            style={{
              fontSize: "64px",
              color: "#1877f2",
              fontWeight: "800",
              marginBottom: "20px",
            }}
          >
            CIG Event Gallery
          </h1>

          <p
            style={{
              fontSize: "32px",
              color: "#1c1e21",
              lineHeight: "1.4",
              marginBottom: "20px",
            }}
          >
            Join Our Community.
            <br />
            Share Every Moment.
          </p>

          <p
            style={{
              fontSize: "22px",
              color: "#606770",
              lineHeight: "1.7",
              maxWidth: "650px",
            }}
          >
            Create your account and start
            managing events, media galleries,
            albums and memories effortlessly.
          </p>
        </div>

        {/* RIGHT SECTION */}

        <div
          style={{
            background: "white",
            padding: "55px",
            borderRadius: "20px",
            boxShadow:
              "0 15px 40px rgba(0,0,0,0.12)",
            width: "100%",
            maxWidth: "700px",
          }}
        >
          <p
            style={{
              textAlign: "center",
              color: "#1877f2",
              fontSize: "22px",
              fontWeight: "600",
              marginBottom: "10px",
            }}
          >
            Start Your Journey Today 🚀
          </p>

          <h2
            style={{
              textAlign: "center",
              fontSize: "48px",
              marginBottom: "35px",
              color: "#1c1e21",
            }}
          >
            Create Account
          </h2>

          <Register />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;