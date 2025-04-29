import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return unsub;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div>
      <nav className="bg-surface shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div>
            <Link to="/" className="text-xl font-bold text-text">OfferPulse</Link>
            {user && (
              <Link to="/dashboard" className="ml-4 text-text hover:text-primary">Dashboard</Link>
            )}
          </div>
          <div>
            {user ? (
              <button onClick={handleLogout} className="text-primary hover:text-primary-hover">Logout</button>
            ) : (
              <Link to="/login" className="text-primary hover:text-primary-hover">Login</Link>
            )}
          </div>
        </div>
      </nav>
      <main className="min-h-[calc(100vh-64px)]">{children}</main>
      <footer className="bg-surface text-center py-4">
        <p className="text-sm text-text">© {new Date().getFullYear()} OfferPulse</p>
      </footer>
    </div>
  );
}
