import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await api.post('/auth/login', {
        userEmail,
        userPass
      });
      
      const { access_token, firstName } = response.data;
      localStorage.setItem('token', access_token);
      if (firstName) {
        localStorage.setItem('user_first_name', firstName);
      }
      
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-sm p-8 card">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Log In
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-slate-400 text-sm mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full p-3 input-field"
              placeholder="email@example.com"
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 text-sm mb-2">Password</label>
            <input 
              type="password" 
              className="w-full p-3 input-field"
              placeholder="••••••••"
              onChange={(e) => setUserPass(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full ${loading ? 'bg-sky-700' : 'bg-sky-600 hover:bg-sky-500'} py-3 rounded-md font-semibold transition-colors`}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-slate-500">
            {/* 2. Replaced <span> with <Link> below */}
            Doesn't have an account?{' '}
            <Link to="/signup" className="text-sky-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;