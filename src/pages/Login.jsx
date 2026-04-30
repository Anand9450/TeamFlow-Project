import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, Lock, Mail, ArrowRight } from 'lucide-react';
import api from '../api/axios';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // In a real app, you would call the backend API
      // const res = await api.post(isLogin ? '/auth/login' : '/auth/register', formData);
      // login(res.data.user); // assume token is stored in axios or localstorage inside login
      
      // Mocking for the demonstration
      setTimeout(() => {
        const mockUser = {
          id: '1',
          name: formData.name || 'Test User',
          email: formData.email,
          role: formData.email.includes('admin') ? 'admin' : 'member'
        };
        login(mockUser);
        navigate('/');
      }, 1000);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-[20%] right-[-5%] w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      
      <div className="max-w-md w-full space-y-8 glass p-8 md:p-10 rounded-3xl shadow-xl relative z-10">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white shadow-lg mb-6">
            <CheckSquare size={32} strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? 'Enter your details to access your dashboard' : 'Join your team and start managing tasks'}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center border border-red-100">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input
                    name="name"
                    type="text"
                    required={!isLogin}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white/50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white/50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white/50 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-md transition-all disabled:opacity-70"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                {isLogin ? 'Sign in' : 'Create account'}
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-primary-600 hover:text-primary-800 font-medium transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
