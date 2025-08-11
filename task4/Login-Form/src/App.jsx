import React, { useState, useEffect } from 'react';
import AuthForm from './AuthForm';
import Dashboard from './Dashboard';

export default function App() {
  const [view, setView] = useState('login');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-4">Authentication App</h1>
        {view === 'login' && <AuthForm mode="login" setView={setView} setMessage={setMessage} setLoading={setLoading} />}
        {view === 'signup' && <AuthForm mode="signup" setView={setView} setMessage={setMessage} setLoading={setLoading} />}
        {view === 'dashboard' && <Dashboard setView={setView} />}
        {loading && <p className="mt-3 text-gray-500">Loading...</p>}
        {message && <p className="mt-3 text-red-600">{message}</p>}
      </div>
    </div>
  );
}


