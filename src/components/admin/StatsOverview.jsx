import '../../styles/AdminDashboard.css';

const StatsOverview = ({ stats }) => {
  const quickActions = [
    {
      title: 'Revisar Certificados',
      description: 'Gestionar certificados pendientes de aprobación',
      count: stats.pendingCertificates,
      action: 'certificates',
      color: 'orange'
    },
    {
      title: 'Aprobar Estudiantes',
      description: 'Revisar aplicaciones a oportunidades',
      count: stats.pendingApplications,
      action: 'applications',
      color: 'blue'
    },
    {
      title: 'Gestionar Usuarios',
      description: 'Administrar usuarios del sistema',
      count: stats.totalUsers,
      action: 'users',
      color: 'green'
    },
    {
      title: 'Crear Oportunidad',
      description: 'Publicar nueva oportunidad académica',
      action: 'opportunities',
      color: 'purple'
    }
  ];

  return (
    <div className="stats-overview">
      <div className="section-header">
        <h1>Resumen del Sistema</h1>
        <p>Vista general de las actividades y estadísticas</p>
      </div>

      {/* Tarjetas de Estadísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon users"></div>
          <div className="stat-info">
            <h3>Total Usuarios</h3>
            <span className="stat-number">{stats.totalUsers}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending"></div>
          <div className="stat-info">
            <h3>Certificados Pendientes</h3>
            <span className="stat-number">{stats.pendingCertificates}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon applications"></div>
          <div className="stat-info">
            <h3>Aplicaciones Pendientes</h3>
            <span className="stat-number">{stats.pendingApplications}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon opportunities">💼</div>
          <div className="stat-info">
            <h3>Oportunidades Activas</h3>
            <span className="stat-number">{stats.activeOpportunities}</span>
          </div>
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="quick-actions-section">
        <h2>Acciones Rápidas</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <div key={index} className={`quick-action-card ${action.color}`}>
              <div className="action-icon">{action.icon}</div>
              <div className="action-content">
                <h3>{action.title}</h3>
                <p>{action.description}</p>
                {action.count !== undefined && (
                  <span className="action-count">{action.count} pendientes</span>
                )}
              </div>
              <button className="action-btn">
                Ir a {action.title}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Actividad Reciente */}
      <div className="recent-activity">
        <h2>Actividad Reciente</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon"></div>
            <div className="activity-content">
              <p><strong>Nuevo usuario registrado:</strong> Ana García (Estudiante)</p>
              <span className="activity-time">Hace 5 minutos</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon"></div>
            <div className="activity-content">
              <p><strong>Certificado subido:</strong> Curso de React Avanzado</p>
              <span className="activity-time">Hace 15 minutos</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon"></div>
            <div className="activity-content">
              <p><strong>Nueva aplicación:</strong> Luis Pérez a Ayudantía en Cálculo</p>
              <span className="activity-time">Hace 30 minutos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;