import Login from "../components/Login";
import "./Auth.css";
import galleryImage from "../assets/gallery-wall.png";

function LoginPage() {
  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="hero-content">
          <h1>CIG Event Gallery</h1>

          <p className="hero-tagline">
            Capture Memories.
            Share Experiences.
            Preserve Every Event.
          </p>

          <p className="hero-description">
            A smart platform for managing
            college events, media galleries,
            event albums and memories in
            one place.
          </p>
        </div>

        <div className="hero-images">
          <img
            src="https://images.unsplash.com/photo-1511578314322-379afb476865"
            alt="event"
          />

          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
            alt="event"
          />

          <img
            src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205"
            alt="event"
          />
        </div>
      </div>

      <div className="auth-right">
        <div className="glass-card">
          <Login />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;