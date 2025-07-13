// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import { useAuth } from '../app/context/AuthContext';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { FcGoogle } from "react-icons/fc"
// export default function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router=useRouter();
//   const { login } = useAuth();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const res = await fetch('http://localhost:5000/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();
//   if (data.token) {
//   login(data.token); 
//   router.push("/");
// }
//      else {
//       alert(data.message || 'Login failed');}
//   };
// return(
//   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
//       <motion.form
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         onSubmit={handleLogin}
//         className="bg-slate-800/90 backdrop-blur p-8 rounded-2xl shadow-xl space-y-5 w-full max-w-sm"
//       >
//         <h2 className="text-3xl font-bold text-center mb-2">Login & Take Control of Your To-Do List</h2>

//         <motion.input
//           whileFocus={{ scale: 1.02 }}
//           type="email"
//           value={email}
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-3 rounded-md bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//         />
//         <motion.input
//           whileFocus={{ scale: 1.02 }}
//           type="password"
//           value={password}
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-3 rounded-md bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//         />
//         <motion.button
//           whileTap={{ scale: 0.98 }}
//           type="submit"
//           className="w-full bg-blue-600 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
//         >
//           Login
//         </motion.button>

//         <div className="flex items-center gap-2 text-sm text-gray-400 text-center">
//           <div className="flex-grow border-t border-gray-600" />
//           <span>or</span>
//           <div className="flex-grow border-t border-gray-600" />
//         </div>

//         <motion.a
//           whileHover={{ scale: 1.03 }}
//           href="http://localhost:5000/api/auth/google"
//           className="flex items-center justify-center gap-3 w-full py-2 px-4 bg-white text-slate-900 rounded-md font-medium hover:bg-gray-200 transition"
//         >
//           <FcGoogle className="text-xl" />
//           Sign in with Google
//         </motion.a>

//         <p className="text-sm text-center text-gray-300 mt-2">
//           Don't have an account?{" "}
//           <Link href="/signup" className="text-blue-400 hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </motion.form>
//     </div>
// )}










'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../app/context/AuthContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        login(data.token);
        router.push('/');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      alert('Server error. Please try again later.');}
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleLogin}
        className="bg-slate-800/90 backdrop-blur p-8 rounded-2xl shadow-xl space-y-5 w-full max-w-sm"
      >
        <h2 className="text-3xl font-bold text-center mb-2">
          Login & Take Control of Your To-Do List
        </h2>

        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-md bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-md bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full bg-blue-600 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Login
        </motion.button>

        <div className="flex items-center gap-2 text-sm text-gray-400 text-center">
          <div className="flex-grow border-t border-gray-600" />
          <span>or</span>
          <div className="flex-grow border-t border-gray-600" />
        </div>

        <motion.a
          whileHover={{ scale: 1.03 }}
          href={`${API}/auth/google`}
          className="flex items-center justify-center gap-3 w-full py-2 px-4 bg-white text-slate-900 rounded-md font-medium hover:bg-gray-200 transition"
        >
          <FcGoogle className="text-xl" />
          Sign in with Google
        </motion.a>

        <p className="text-sm text-center text-gray-300 mt-2">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
