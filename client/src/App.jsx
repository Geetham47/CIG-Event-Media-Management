import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import DashboardPage from "./pages/DashboardPage";
import EventDashboard from "./pages/EventDashboard";
import AnalyticsPage from "./pages/AnalyticsPage";

import MediaUpload from "./components/MediaUpload";
import MediaGallery from "./components/MediaGallery";

import ProtectedRoute from "./components/ProtectedRoute";
import MyPhotosPage
from "./pages/MyPhotosPage";

import UploadSelfiePage from "./pages/UploadSelfiePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <EventDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <MediaUpload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/gallery"
          element={
            <ProtectedRoute>
              <MediaGallery />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <Navigate to="/" />
          }
        />
        <Route
  path="/my-photos"
  element={
    <ProtectedRoute>
      <MyPhotosPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/upload-selfie"
  element={
    <ProtectedRoute>
      <UploadSelfiePage />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;