import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // This takes the user to the dashboard after clicking the button
    navigate('/dashboard');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-950 px-4">
      
      <div className="w-full max-w-sm p-8 bg-slate-900 rounded-lg border border-slate-800 shadow-xl">
        
        {/* Changed from "Sign In" to "Log In" */}
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Log In
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-slate-400 text-sm mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 outline-none focus:ring-1 focus:ring-sky-500"
              placeholder="email@example.com"
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 text-sm mb-2">Password</label>
            <input 
              type="password" 
              className="w-full p-3 rounded bg-slate-800 text-white border border-slate-700 outline-none focus:ring-1 focus:ring-sky-500"
              placeholder="••••••••"
              onChange={(e) => setUserPass(e.target.value)}
              required
            />
          </div>

          {/* Changed from "Enter Dashboard" to "Log in" */}
          <button 
            type="submit" 
            className="w-full bg-sky-600 hover:bg-sky-500 text-white py-3 rounded-md font-semibold transition-colors"
          >
            Log in
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-slate-500">
            New here? <span className="text-sky-400 cursor-pointer hover:underline">Create account</span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;