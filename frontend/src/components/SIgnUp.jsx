import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  
  // State to store what the user types
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registering user:", formData);
    // After clicking register, go to login page
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0B1120] p-6">
      
      {/* Main Card with the Blue Border */}
      <div className="w-full max-w-4xl bg-[#1B2537] p-10 rounded-2xl border-[3px] border-[#3B82F6] shadow-2xl">
        
        <h2 className="text-5xl font-bold text-white text-center mb-10">Sign Up</h2>

        <form onSubmit={handleRegister} className="space-y-6">
          
          {/* Row 1: Names (3 Columns on PC) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-white text-sm ml-1">First Name</label>
              <input 
                type="text" 
                className="p-3 rounded-lg bg-[#D1D5DB] text-black outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-white text-sm ml-1">Middle Name</label>
              <input 
                type="text" 
                className="p-3 rounded-lg bg-[#D1D5DB] text-black outline-none"
                onChange={(e) => setFormData({...formData, middleName: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-white text-sm ml-1">Last Name</label>
              <input 
                type="text" 
                className="p-3 rounded-lg bg-[#D1D5DB] text-black outline-none"
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Row 2: Email (Full Width) */}
          <div className="flex flex-col gap-1">
            <label className="text-white text-sm ml-1">Email</label>
            <input 
              type="email" 
              className="p-3 rounded-lg bg-[#D1D5DB] text-black outline-none"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          {/* Row 3: Passwords (2 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <label className="text-white text-sm ml-1">Password</label>
              <input 
                type="password" 
                className="p-3 rounded-lg bg-[#D1D5DB] text-black outline-none"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-white text-sm ml-1">Confirm Password</label>
              <input 
                type="password" 
                className="p-3 rounded-lg bg-[#D1D5DB] text-black outline-none"
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col items-center gap-4 mt-8">
            <button 
              type="submit"
              className="bg-[#3B82F6] hover:bg-blue-600 text-white font-bold py-3 px-16 rounded-xl text-xl transition-all shadow-lg active:scale-95"
            >
              SignUp
            </button>
            
            <p className="text-white text-sm">
              Already have an account? <Link to="/login" className="text-blue-400 hover:underline ml-1">Login</Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SignUp;