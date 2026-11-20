'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from '@/lib/auth-client';
import { apiRequest } from '@/lib/api';
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('salonbook_token');
    }
    setUser(null);
    setToken(null);
    try {
      await signOut();
    } catch (err) {
      console.error('Failed to sign out:', err);
    }
    toast.success('Logged out successfully');
    router.push('/');
  }, [router]);

  const refreshUser = useCallback(async () => {
    try {
      const data = await apiRequest('/api/me');
      const currentUser = data?.user || data;
      setUser(currentUser);
      return currentUser;
    } catch (err) {
      console.error('Failed to refresh user:', err);
      if (err.status === 401 || err.status === 403) {
        await logout();
      }
      throw err;
    }
  }, [logout]);

  useEffect(() => {
    if (isPending) {
      return;
    }

    let isCancelled = false;

    if (session?.user?.email) {
      const syncJwt = async () => {
        setLoading(true);
        try {
          const data = await apiRequest('/api/auth/jwt', {
            method: 'POST',
            body: {
              email: session.user.email,
              name: session.user.name,
              image: session.user.image,
            },
          });

          if (isCancelled) return;

          if (typeof window !== 'undefined') {
            localStorage.setItem('salonbook_token', data.token);
          }
          setToken(data.token);
          setUser(data.user);
        } catch (err) {
          if (isCancelled) return;

          if (err.status === 403) {
            toast.error(err.message || 'Your account has been suspended by an administrator.');
            if (typeof window !== 'undefined') {
              localStorage.removeItem('salonbook_token');
            }
            setUser(null);
            setToken(null);
            try {
              await signOut();
            } catch (signOutErr) {
              console.error('Failed to sign out:', signOutErr);
            }
          } else {
            toast.error(err.message || 'Failed to authenticate with server');
          }
        } finally {
          if (!isCancelled) {
            setLoading(false);
          }
        }
      };

      syncJwt();
    } else {
      const clearSession = () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('salonbook_token');
        }
        setUser(null);
        setToken(null);
        setLoading(false);
      };

      queueMicrotask(() => {
        if (!isCancelled) {
          clearSession();
        }
      });
    }

    return () => {
      isCancelled = true;
    };
  }, [session?.user?.email, session?.user?.name, session?.user?.image, isPending]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        loading,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
