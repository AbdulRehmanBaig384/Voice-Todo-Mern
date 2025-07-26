import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../app/context/AuthContext';

export default function GoogleSuccessPage() {
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const { token } = router.query;

    if (token) {
      login(token);             
      router.push('/');          
    }
  }, [router.query]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <p className="text-xl"> Logging you in via Google...</p>
    </div>
  );
}
