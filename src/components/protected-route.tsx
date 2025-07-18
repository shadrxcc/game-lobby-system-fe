import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth.context';
import LobbyLayout from './layout/lobby.layout';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <LobbyLayout />;
};

export default ProtectedRoute; 