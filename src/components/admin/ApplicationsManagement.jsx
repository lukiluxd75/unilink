import { useState, useEffect } from 'react';
import '../../styles/AdminDashboard.css';

const ApplicationsManagement = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('pending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, [filter]);

  const loadApplications = async () => {
    try {
      // Simular carga de datos
      setTimeout(() => {
        const mockData = [
          {
            id: 1,
            studentName: 'Ana García',
            studentCareer: 'Ingeniería',
            studentGrade: 4.5,
            opportunityTitle: 'Ayudantía en Cálculo I',
            opportunityType: 'Ayudantía',
            applicationDate: '2024-01-20',
            status: 'pending'
          },
          {
            id: 2,
            studentName: 'Luis Pérez',
            studentCareer: 'Sistemas',
            studentGrade: 4.2,
            opportunityTitle: 'Pasantía en Desarrollo Web',
            opportunityType: 'Pasantía',
            applicationDate: '2024-01-18',
            status: 'approved'
          }
        ];
        
        let filteredData = mockData;
        if (filter !== 'all') {
          filteredData = mockData.filter(app => app.status === filter);
        }
        
        setApplications(filteredData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error cargando aplicaciones:', error);
      setLoading(false);
    }
  };

  const handleReview = async (applicationId, status, comments = '') => {
    try {
      // Aquí iría la llamada a la API
      console.log(`Aplicación ${applicationId} - ${status}: ${comments}`);
      alert(`Aplicación ${status === 'approved' ? 'aprobada' : 'rechazada'} correctamente`);
      loadApplications();
    } catch (error) {
      console.error('Error revisando aplicación:', error);
      alert('Error al procesar la solicitud');
    }
  };

  if (loading) {
    return <div className="loading">Cargando aplicaciones...</div>;
  }

  return (
    <div className="management-section">
      <div className="section-header">
        <h1>Gestión de Aplicaciones</h1>
        <p>Revisa y aprueba las aplicaciones de estudiantes a oportunidades</p>
      </div>

      <div className="filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Todas
        </button>
        <button 
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pendientes
        </button>
        <button 
          className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}
          onClick={() => setFilter('approved')}
        >
          Aprobadas
        </button>
        <button 
          className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
          onClick={() => setFilter('rejected')}
        >
          Rechazadas
        </button>
      </div>

      <div className="applications-list">
        {applications.length === 0 ? (
          <div className="empty-state">
            <p>No hay aplicaciones {filter !== 'all' ? `con estado ${filter}` : ''}</p>
          </div>
        ) : (
          applications.map(application => (
            <div key={application.id} className="application-card">
              <div className="application-info">
                <h3>{application.opportunityTitle}</h3>
                <div className="application-details">
                  <p><strong>Estudiante:</strong> {application.studentName}</p>
                  <p><strong>Carrera:</strong> {application.studentCareer}</p>
                  <p><strong>Promedio:</strong> {application.studentGrade}</p>
                  <p><strong>Tipo:</strong> {application.opportunityType}</p>
                  <p><strong>Fecha de aplicación:</strong> {new Date(application.applicationDate).toLocaleDateString()}</p>
                </div>
                <div className="application-status">
                  <span className={`status-badge status-${application.status}`}>
                    {application.status === 'pending' ? 'Pendiente' : 
                     application.status === 'approved' ? 'Aprobada' : 'Rechazada'}
                  </span>
                </div>
              </div>
              
              <div className="application-actions">
                {application.status === 'pending' && (
                  <div className="review-actions">
                    <button 
                      className="btn-approve"
                      onClick={() => handleReview(application.id, 'approved')}
                    >
                      Aprobar
                    </button>
                    <button 
                      className="btn-reject"
                      onClick={() => {
                        const comments = prompt('Motivo del rechazo:');
                        if (comments) {
                          handleReview(application.id, 'rejected', comments);
                        }
                      }}
                    >
                       Rechazar
                    </button>
                  </div>
                )}
                
                <button className="btn-view-profile">
                   Ver Perfil
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ApplicationsManagement;