// src/components/admin/AdminDashboard.jsx - VERSIÓN MÍNIMA FUNCIONAL
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Header from '../common/Header';
import '../../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');

  // Componentes mínimos inline para evitar imports
  const StatsOverview = () => (
    <div className="stats-overview">
      <div className="section-header">
        <h1>Resumen del Sistema</h1>
        <p>Vista general de las actividades y estadísticas</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>Total Usuarios</h3>
            <span className="stat-number">150</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>Certificados Pendientes</h3>
            <span className="stat-number">8</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-info">
            <h3>Aplicaciones Pendientes</h3>
            <span className="stat-number">23</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">💼</div>
          <div className="stat-info">
            <h3>Oportunidades Activas</h3>
            <span className="stat-number">12</span>
          </div>
        </div>
      </div>
    </div>
  );

  const CertificatesManagement = () => (
    <div className="management-section">
      <div className="section-header">
        <h1>Gestión de Certificados</h1>
        <p>Revisa y aprueba los certificados subidos por los profesores</p>
      </div>
      <div className="empty-state">
        <p>No hay certificados pendientes</p>
      </div>
    </div>
  );

  const ApplicationsManagement = () => (
    <div className="management-section">
      <div className="section-header">
        <h1>Gestión de Aplicaciones</h1>
        <p>Revisa y aprueba las aplicaciones de estudiantes</p>
      </div>
      <div className="empty-state">
        <p>No hay aplicaciones pendientes</p>
      </div>
    </div>
  );

  const UsersManagement = () => (
    <div className="management-section">
      <div className="section-header">
        <h1>Gestión de Usuarios</h1>
        <p>Administra los usuarios del sistema</p>
      </div>
      <div className="empty-state">
        <p>Funcionalidad en desarrollo</p>
      </div>
    </div>
  );

  const OpportunitiesManagement = () => (
    <div className="management-section">
      <div className="section-header">
        <h1>Gestión de Oportunidades</h1>
        <p>Crea y gestiona oportunidades académicas</p>
      </div>
      <div className="empty-state">
        <p>Funcionalidad en desarrollo</p>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <StatsOverview />;
      case 'certificates':
        return <CertificatesManagement />;
      case 'applications':
        return <ApplicationsManagement />;
      case 'users':
        return <UsersManagement />;
      case 'opportunities':
        return <OpportunitiesManagement />;
      default:
        return <StatsOverview />;
    }
  };

  return (
    <div className="admin-dashboard">
      <Header />
      
      <div className="admin-container">
        {/* Sidebar de Navegación */}
        <div className="admin-sidebar">
          <div className="admin-welcome">
            <h2>👨‍💼 Panel de Administración</h2>
            <p>Bienvenido, <strong>{user?.name}</strong></p>
          </div>
          
          <nav className="admin-nav">
            <button 
              className={`nav-btn ${activeSection === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveSection('overview')}
            >
              📊 Resumen
            </button>
            <button 
              className={`nav-btn ${activeSection === 'certificates' ? 'active' : ''}`}
              onClick={() => setActiveSection('certificates')}
            >
              📋 Certificados
            </button>
            <button 
              className={`nav-btn ${activeSection === 'applications' ? 'active' : ''}`}
              onClick={() => setActiveSection('applications')}
            >
              📝 Aplicaciones
            </button>
            <button 
              className={`nav-btn ${activeSection === 'users' ? 'active' : ''}`}
              onClick={() => setActiveSection('users')}
            >
              👥 Usuarios
            </button>
            <button 
              className={`nav-btn ${activeSection === 'opportunities' ? 'active' : ''}`}
              onClick={() => setActiveSection('opportunities')}
            >
              💼 Oportunidades
            </button>
          </nav>

          <div className="admin-actions">
            <button className="btn-logout" onClick={logout}>
              🚪 Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="admin-content">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;