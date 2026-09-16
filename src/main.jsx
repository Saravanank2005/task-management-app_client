import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import App from './App';
import './styles/index.css';

// Google OAuth Client ID placeholder (can be passed via VITE_GOOGLE_CLIENT_ID or defaults)
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '674600937844-sbkl3phfi8g8cene5ektcco0rnac5ja2.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
