import React from 'react';
import { useLocation } from 'react-router'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const AuthPage: React.FC = () => {
  const location = useLocation()
  const isLogin = location.pathname === "/login"
  return (
    <div className="py-10" style={{ height: '70vh', backgroundColor: '#f0f0f0' }}> 
      <div className="signin-container mx-auto" style={styles.container}>
        <h2 style={styles.title}>{isLogin ? 'Entrar ' : 'Registrarse'}</h2>
        <form style={styles.form}>
          <div style={styles.inputGroup}>
            <Label htmlFor="text">Email</Label>
            <Input  type="text" id="text" name="text" placeholder="Enter your email" />
          </div>
          <div style={styles.inputGroup}>
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* {isLogin && <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </a>} */}
              </div>
            <Input  type="password" id="password" name="password" placeholder="Enter your password" />
          </div>
          <Button type="submit">{isLogin?"Entrar":"Registrarse"}</Button>
        </form>
        {isLogin && (
          <p style={styles.footerText}>
            Don't have an account? <a href="/signup" style={styles.link}>Sign Up</a>
          </p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center' as const,
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  footerText: {
    textAlign: 'center' as const,
    marginTop: '15px',
    fontSize: '14px',
    color: '#555',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default AuthPage;