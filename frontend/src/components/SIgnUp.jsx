import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  // State to store what the user types
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/signup', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      
      // After clicking register, go to login page
      navigate('/login');
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      
      {/* Main Card with the Blue Border */}
      <div className="w-full max-w-4xl p-10 card border-[3px] border-[#3B82F6] shadow-2xl">
        
        <h2 className="text-5xl font-bold text-center mb-10">Sign Up</h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-6 text-center font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          
          {/* Row 1: Names (2 Columns on PC) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-sm ml-1">First Name</label>
              <input 
                type="text" 
                className="p-3 input-field"
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm ml-1">Last Name</label>
              <input 
                type="text" 
                className="p-3 input-field"
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Row 2: Email (Full Width) */}
          <div className="flex flex-col gap-1">
            <label className="text-sm ml-1">Email</label>
            <input 
              type="email" 
              className="p-3 input-field"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          {/* Row 3: Passwords (2 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-sm ml-1">Password</label>
              <input 
                type="password" 
                className="p-3 input-field"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm ml-1">Confirm Password</label>
              <input 
                type="password" 
                className="p-3 input-field"
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col items-center gap-4 mt-8">
            <button 
              type="submit"
              disabled={loading}
              className={`${loading ? 'bg-blue-800' : 'bg-[#3B82F6] hover:bg-blue-600'} font-bold py-3 px-16 rounded-xl text-xl transition-all shadow-lg active:scale-95`}
            >
              {loading ? 'Signing up...' : 'SignUp'}
            </button>
            
            <p className="text-sm">
              Already have an account? <Link to="/login" className="text-blue-400 hover:underline ml-1">Login</Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SignUp;