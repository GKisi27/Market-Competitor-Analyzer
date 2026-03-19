import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

const EyeIcon = ({ open }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {open ? (
      <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
    ) : (
      <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
    )}
  </svg>
);

const PasswordField = ({ label, value, onChange }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          required
          className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-blue-500 transition-colors pr-11"
        />
        <button type="button" onClick={() => setShow(s => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
          <EyeIcon open={show} />
        </button>
      </div>
    </div>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
  });

  React.useEffect(() => {
    if (localStorage.getItem('token')) navigate('/dashboard');
  }, [navigate]);

  const set = (key) => (e) => setFormData(f => ({ ...f, [key]: e.target.value }));

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match'); return;
    }
    setLoading(true);
    try {
      await api.post('/auth/signup', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 bg-[#0D1B3E] flex-col justify-between p-14 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />

        {/* Logo / Brand */}
        <div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">Market Competitor Analyzer</span>
          </div>
        </div>

        {/* Center content */}
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-white leading-tight">
            Track. Analyze.<br />
            <span className="text-blue-400">Stay Ahead.</span>
          </h1>
          <p className="text-blue-200/70 text-base leading-relaxed max-w-sm">
            Monitor Nepal's top IT training providers in real time. Compare prices, curriculum gaps, and market positioning — all in one place.
          </p>

          {/* Feature pills */}
          <div className="flex flex-col gap-3 pt-2">
            {[
              'Realtime price tracking across 5+ institutes',
              'Curriculum gap analysis & SWOT mapping',
              'Automated crawler jobs',
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <span className="text-blue-100/60 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-blue-200/30 text-xs">© 2025 Market Competitor Analyzer</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-7">

          {/* Heading */}
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">Create your account</h2>
            <p className="text-sm text-[var(--text-muted)]">Already have an account?{' '}
              <Link to="/login" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">Sign in</Link>
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/40 text-red-400 px-4 py-3 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">

            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">First Name</label>
                <input
                  type="text" value={formData.firstName} onChange={set('firstName')} required
                  className="bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">Last Name</label>
                <input
                  type="text" value={formData.lastName} onChange={set('lastName')} required
                  className="bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">Email Address</label>
              <input
                type="email" value={formData.email} onChange={set('email')} required
                className="bg-[var(--bg-input)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Passwords */}
            <PasswordField label="Password" value={formData.password} onChange={set('password')} />
            <PasswordField label="Confirm Password" value={formData.confirmPassword} onChange={set('confirmPassword')} />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg text-sm transition-all active:scale-[0.98] mt-2 shadow-lg shadow-blue-900/20"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

          </form>

          {/* Terms */}
          <p className="text-xs text-center text-[var(--text-muted)]">
            By signing up you agree to our{' '}
            <span className="text-blue-500 cursor-pointer hover:underline">Terms of Service</span>
            {' '}and{' '}
            <span className="text-blue-500 cursor-pointer hover:underline">Privacy Policy</span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default SignUp;