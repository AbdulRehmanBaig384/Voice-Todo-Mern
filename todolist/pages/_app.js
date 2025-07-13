// pages/_app.js
import { AuthProvider } from '@/app/context/AuthContext'; // your styles
import '../app/globals.css'
export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
