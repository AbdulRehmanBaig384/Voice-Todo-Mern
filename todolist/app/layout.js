import './globals.css';
import { AuthProvider } from './context/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
    
        <AuthProvider>{children}</AuthProvider>
    
      </body>
    </html>
  );
}

