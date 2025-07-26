'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/app/context/AuthContext';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();
    if (data.token) {
      login(data.token);
      router.push('/');
    } else {
      alert(data.message || 'Signup failed');
    }
  };
return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <motion.form
        onSubmit={handleSignup}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-gray-800 p-6 rounded-md space-y-4 w-full max-w-sm shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center">Create Account</h2>

        <input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"/>

        <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500" />

        <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded bg-gray-700 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"/>

        <button  type="submit" className="w-full bg-green-600 hover:bg-green-700 py-3 rounded font-semibold transition">Sign Up
        </button>
     <p className="text-center text-sm text-gray-300 pt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-green-400 hover:underline transition">
            Login here
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
