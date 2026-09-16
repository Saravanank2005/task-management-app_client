import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { Zap, UserCheck, AlertTriangle, UserPlus, LogIn, Database, Globe } from 'lucide-react';

export default function LoginModal() {
  const { loginWithGoogle, loginDemo, authError } = useAuth();
  const [authMode, setAuthMode] = useState('signup'); // 'signup' or 'signin'

  return (
    <div className="auth-hero">
      <div className="auth-card">
        <div className="auth-logo">
          <Zap size={32} />
        </div>

        <h1 className="auth-title">Welcome to Task360</h1>
        <p className="auth-subtitle">
          {authMode === 'signup'
            ? 'Sign up with your Google account. Your user profile and tasks will be saved securely in MongoDB Atlas.'
            : 'Sign in with your Google account to access your Task360 dashboard.'}
        </p>

        {/* MongoDB Atlas Sync Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'rgba(16, 185, 129, 0.12)',
          color: '#10b981',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          padding: '0.3rem 0.75rem',
          borderRadius: '9999px',
          fontSize: '0.78rem',
          fontWeight: 600,
          marginBottom: '1.25rem'
        }}>
          <Database size={13} />
          <span>MongoDB Atlas Data Storage Active</span>
        </div>

        {/* Toggle between Sign Up and Sign In */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-input)',
          padding: '0.25rem',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          border: '1px solid var(--border-color)'
        }}>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            style={{
              flex: 1,
              padding: '0.55rem',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              transition: 'var(--transition-fast)',
              background: authMode === 'signup' ? 'var(--primary)' : 'transparent',
              color: authMode === 'signup' ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            <UserPlus size={15} />
            <span>Sign Up (First Time)</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthMode('signin')}
            style={{
              flex: 1,
              padding: '0.55rem',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              transition: 'var(--transition-fast)',
              background: authMode === 'signin' ? 'var(--primary)' : 'transparent',
              color: authMode === 'signin' ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            <LogIn size={15} />
            <span>Sign In (Existing)</span>
          </button>
        </div>

        {authError && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            color: '#ef4444',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            padding: '0.75rem',
            borderRadius: '12px',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertTriangle size={16} />
            <span>{authError}</span>
          </div>
        )}

        <div className="auth-buttons-group">
          {/* Official Google OAuth 2.0 Button */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                  loginWithGoogle(credentialResponse.credential);
                }
              }}
              onError={() => {
                console.error('Google Auth Failed');
              }}
              theme="outline"
              shape="pill"
              text="continue_with"
              size="large"
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              {authMode === 'signup'
                ? 'Create user record & store in Atlas DB'
                : 'Authenticate and load Task360 dashboard'}
            </span>
          </div>

          {/* Persistent Global Demo Account Button */}
          <div className="demo-login-box">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
              <Globe size={14} style={{ color: '#475569' }} />
              <span className="demo-badge">Global Cross-Device Demo Account</span>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => loginDemo()}
            >
              <UserCheck size={18} />
              <span>Task360 Demo Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
