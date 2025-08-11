import React, { useState } from 'react';
function AuthForm({ mode, setView, setMessage, setLoading }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(`http://localhost:4000/api/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mode === 'signup' ? { name, email, password } : { email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
      } else {
        if (mode === 'login') {
          localStorage.setItem('token', data.token);
          setView('dashboard');
        } else {
          setMessage('Signup successful! Please login.');
          setView('login');
        }
      }
    } catch (err) {
      setMessage('Network error');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === 'signup' && (
        <input className="w-full border p-2 rounded" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      )}
      <input className="w-full border p-2 rounded" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">
        {mode === 'login' ? 'Login' : 'Signup'}
      </button>
      <p className="text-sm text-center cursor-pointer text-indigo-600" onClick={() => setView(mode === 'login' ? 'signup' : 'login')}>
        {mode === 'login' ? 'No account? Signup' : 'Have an account? Login'}
      </p>
    </form>
  );
}

export default AuthForm;