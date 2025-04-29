import React, { useState } from 'react';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [plan, setPlan] = useState('FREE_TRIAL');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Firebase signup / login
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (err) {
        if (err.code === 'auth/email-already-in-use') {
          await signInWithEmailAndPassword(auth, email, password);
        } else {
          throw err;
        }
      }

      if (plan === 'FREE_TRIAL') {
        // Free trial: redirect to dashboard
        navigate('/dashboard');
        return;
      }

      // Paid plan: Stripe checkout
      const priceId = import.meta.env[`VITE_PRICE_ID_${plan}`];
      const res = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId })
      });
      const data = await res.json();
      if (data.sessionId) {
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        alert('Checkout session error: ' + JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-surface p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-text">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <input
              type="email"
              required
              className="w-full px-3 py-2 bg-background border border-gray-700 rounded-md text-text focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              className="w-full px-3 py-2 bg-background border border-gray-700 rounded-md text-text focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <select
              className="w-full px-3 py-2 bg-background border border-gray-700 rounded-md text-text focus:outline-none focus:ring-primary focus:border-primary"
              value={plan}
              onChange={e => setPlan(e.target.value)}
            >
              <option value="FREE_TRIAL">Free Trial (14 days)</option>
              <option value="STARTER">Starter - £49/month</option>
              <option value="PRO">Pro - £99/month</option>
            </select>
          </div>
          <button>
type="submit"
className="w-full py-2 px-4 bg-primary text-white rounded-full hover:bg-primary-hover transition"
{/* Show Free Trial label if that plan */}
  {plan === 'FREE_TRIAL'
    ? 'Start Free Trial'
    : 'Continue to Checkout'}
        </button>
        </form>
      </div>
    </div>
  );
}
