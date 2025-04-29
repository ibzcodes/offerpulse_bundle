import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  doc,
  updateDoc,
  where,
  deleteDoc
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [offers, setOffers] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Listen for auth state
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        navigate('/login');
      }
      setLoadingUser(false);
    });
    return unsubAuth;
  }, [navigate]);

  // Once user is confirmed, listen for offers
  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'offers'),
      where('userId', '==', user.uid),
      orderBy('timestamp', 'desc')
    );
    const unsub = onSnapshot(q, (snap) => {
      setOffers(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    console.log("Saving offer", { title, description, userId: user?.uid });
    e.preventDefault();
    setLoading(true);
    const payload = {
      userId: user.uid,
      title,
      description,
      timestamp: serverTimestamp()
    };
    try {
      if (editingId) {
        await updateDoc(doc(db, 'offers', editingId), payload);
        setEditingId(null);
      } else {
        await addDoc(collection(db, 'offers'), payload);
      }
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error('Error saving offer:', err);
      alert('Error saving offer: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this offer?')) {
      await deleteDoc(doc(db, 'offers', id));
    }
  };

  const handleEdit = (o) => {
    setEditingId(o.id);
    setTitle(o.title);
    setDescription(o.description);
  };

  const canSave = title.trim() && description.trim();

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-text">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <img src="/offerPulse_logo.png" alt="OfferPulse.ai" className="h-8 w-auto mr-3" />
            <h1 className="text-2xl font-bold text-text">Dashboard</h1>
          </div>
          <button onClick={handleLogout} className="text-primary hover:text-primary-hover">
            Logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mb-6 bg-surface p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-text mb-4">
            {editingId ? 'Edit Offer' : 'New Offer'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title Field */}
            <div className="relative">
              <input
                id="title"
                type="text"
                className="peer w-full bg-background border border-gray-700 rounded p-2 text-text focus:outline-none focus:ring-primary focus:border-primary"
                placeholder=" "
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <label
                htmlFor="title"
                className="absolute left-3 -top-3 text-sm text-accent
                  peer-placeholder-shown:top-2 peer-placeholder-shown:left-3 peer-placeholder-shown:text-text
                  peer-focus:-top-3 peer-focus:text-sm peer-focus:text-accent transition-all"
              >
                Title
              </label>
            </div>

            {/* Description Field */}
            <div className="relative">
              <textarea
                id="description"
                className="peer w-full bg-background border border-gray-700 rounded p-2 text-text focus:outline-none focus:ring-primary focus:border-primary"
                placeholder=" "
                value={description}
                onChange={e => setDescription(e.target.value)}
              ></textarea>
              <label
                htmlFor="description"
                className="absolute left-3 -top-3 text-sm text-accent
                  peer-placeholder-shown:top-2 peer-placeholder-shown:left-3 peer-placeholder-shown:text-text
                  peer-focus:-top-3 peer-focus:text-sm peer-focus:text-accent transition-all"
              >
                Description
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={!canSave || loading}
            className={`mt-4 px-4 py-2 rounded text-white
              ${canSave && !loading ? 'bg-primary hover:bg-primary-hover' : 'bg-gray-500 cursor-not-allowed'}`}
          >
            {editingId ? 'Update' : 'Save'} Offer
            {loading && (
              <svg className="animate-spin h-5 w-5 text-white ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l-4 4-4-4v4a8 8 0 018 8v-4l4-4 4 4v-4a8 8 0 01-8-8z"></path>
              </svg>
            )}
          </button>
        </form>

        {/* Offers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map(o => (
            <div key={o.id} className="bg-surface p-4 rounded-lg shadow group relative overflow-hidden">
              <div>
                <h3 className="text-lg font-bold text-text">{o.title}</h3>
                <p className="mt-1 text-text">{o.description}</p>
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition space-x-2">
                <button onClick={() => handleEdit(o)} className="text-primary hover:underline">Edit</button>
                <button onClick={() => handleDelete(o.id)} className="text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
