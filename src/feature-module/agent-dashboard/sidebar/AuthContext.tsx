// AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define types based on your API response
type User = {
  _id: string;
  Email: string;
  Nom: string;
  Prenom: string;
  Role: string;
  Num_Telephone: string;
  Adresse: string;
  Date_Creation: string;
  token: string;
};

type LoginCredentials = {
  Email: string;
  MDP: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: () => boolean;
  hasRole: (role: string) => boolean;
};


const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const hasRole = (role: string) => {
    return user?.Role === role;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('userData');

      if (token && userData) {
        try {
          // Verify token with backend if needed
          setUser({ ...JSON.parse(userData), token });
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await axios.post('http://127.0.0.1:3000/utilisateur/login', credentials);
      
      if (response.status === 200) {
        const { mytoken } = response.data;
        const decoded = jwtDecode(mytoken) as Omit<User, 'token'>;
        
        const userData = {
          ...decoded,
          token: mytoken
        };

        setUser(userData);
        localStorage.setItem('token', mytoken);
        localStorage.setItem('userData', JSON.stringify(decoded));
        return { success: true };
      }
      
      return { success: false, error: 'Login failed' };
    } catch (error) {
      let errorMessage = 'Login failed';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data || error.message;
      }
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    navigate('/login');
    console.log("loged out")
  };

  const isAuthenticated = () => {
    return !!user?.token;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Simple JWT decoder (you might want to use a library like jwt-decode instead)
function jwtDecode(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}