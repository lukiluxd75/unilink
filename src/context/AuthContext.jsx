import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Inicialmente true para verificar auth

  // Verificar autenticación al cargar la app
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      console.log("🔍 Verificando autenticación...", { token, userData });

      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
        console.log("✅ Usuario autenticado encontrado:", parsedUser);
      } else {
        console.log("❌ No hay usuario autenticado");
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("💥 Error verificando autenticación:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Login REAL con tu backend
  const login = async (email, password) => {
    setLoading(true);
    try {
      console.log("🔐 Iniciando login real...");
      
      // Aquí usamos tu API real, no la simulación
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("📨 Respuesta del servidor:", data);

      if (data.success) {
        const userData = data.user;
        
        // Guardar en estado y localStorage
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        console.log("✅ Login exitoso:", userData);
        return { success: true, user: userData };
      } else {
        console.log("❌ Login fallido:", data.error);
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error("💥 Error en login:", error);
      return { success: false, error: 'Error de conexión' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log("🚪 Cerrando sesión...");
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    loading,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};