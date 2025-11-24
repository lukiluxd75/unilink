import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles/globals.css';
import Home from './pages/Home';
import Login from './pages/Login';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './components/admin/AdminDashboard'; 
import Chatbot from "./components/ChatBot";
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    switch (user.role) {
      case 'student':
        return <Navigate to="/student/dashboard" />;
      case 'teacher':
        return <Navigate to="/teacher/dashboard" />;
      case 'admin':
        return <Navigate to="/admin/dashboard" />;
      default:
        return <Navigate to="/" />;
    }
  }
  
  return children;
};

const DashboardRedirect = () => {
  const { user } = useAuth();
  
  if (user) {
    switch (user.role) {
      case 'student':
        return <Navigate to="/student/dashboard" />;
      case 'teacher':
        return <Navigate to="/teacher/dashboard" />;
      case 'admin':
        return <Navigate to="/admin/dashboard" />;
      default:
        return <Navigate to="/" />;
    }
  }
  
  return <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/dashboard" element={<DashboardRedirect />} />
            
            <Route 
              path="/student/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            
            
            <Route 
              path="/teacher/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <TeacherDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
             
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Chatbot />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;