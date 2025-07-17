import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/auth.context";
import ProtectedRoute from "./components/protected-route";
import Login from "./pages/login";
import LobbyPage from "./pages/lobby";
import GamePage from "./pages/game";
import Register from "./pages/register";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lobby" element={<ProtectedRoute />}>
            <Route index element={<LobbyPage />} />
            <Route path="game" element={<GamePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
