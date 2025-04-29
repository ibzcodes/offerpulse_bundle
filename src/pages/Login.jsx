import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white px-4">
      <form onSubmit={handleLogin} className="w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold">Login</h2>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 rounded-lg text-black"
          required
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 rounded-lg text-black"
          required
        />
        <button
          type="submit"
          className="w-full bg-primary py-3 rounded-lg font-semibold hover:bg-primary-hover"
        >
          Login
        </button>
        <p className="mt-4 text-center text-sm">
          Need an account?{' '}
          <Link to="/signup" className="underline text-blue-400 hover:text-blue-600">
            Sign up
          </Link>
        </p>
      </form>
    </div>
);
}