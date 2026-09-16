import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CircleDot, LogOut, User as UserIcon } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [imgError, setImgError] = useState(false);

  const fallbackAvatar = user?.name
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0f172a&color=fff`
    : '';

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <div className="brand-icon">
          <CircleDot size={20} />
        </div>
        <span>Task360</span>
      </div>

      {user && (
        <div className="user-profile-menu">
          <div className="user-badge">
            {user.picture && !imgError ? (
              <img
                src={user.picture}
                alt={user.name}
                className="user-avatar"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
              />
            ) : fallbackAvatar ? (
              <img
                src={fallbackAvatar}
                alt={user.name}
                className="user-avatar"
              />
            ) : (
              <UserIcon size={16} />
            )}
            <span className="user-name">{user.name}</span>
          </div>

          <button className="btn btn-secondary btn-sm" onClick={logout} title="Sign Out">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </nav>
  );
}
