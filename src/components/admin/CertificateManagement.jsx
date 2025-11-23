import { useState, useEffect } from 'react';
import '../../styles/AdminDashboard.css';

const CertificatesManagement = () => {
  const [certificates, setCertificates] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCertificates();
  }, [filter]);

  const loadCertificates = async () => {
    try {
      // Simular carga de datos
      setTimeout(() => {
        const mockData = [
          {
            id: 1,
            title: 'Curso de React Avanzado',
            institution: 'Platzi',
            teacherName: 'María Rodríguez',
            issueDate: '2024-01-15',
            type: 'course',
            status: 'pending',
            fileUrl: '/certificates/cert1.pdf'
          },
          {
            id: 2,
            title: 'Diplomado en Educación',
            institution: 'Universidad Nacional',
            teacherName: 'Carlos López',
            issueDate: '2024-01-10',
            type: 'diploma',
            status: 'approved',
            fileUrl: '/certificates/cert2.pdf'
          }
        ];
        
        let filteredData = mockData;
        if (filter !== 'all') {
          filteredData = mockData.filter(cert => cert.status === filter);
        }
        
        setCertificates(filteredData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error cargando certificados:', error);
      setLoading(false);
    }
  };

  const handleReview = async (certificateId, status, comments = '') => {
    try {
      // Aquí iría la llamada a la API para aprobar/rechazar
      console.log(`Certificado ${certificateId} - ${status}: ${comments}`);
      alert(`Certificado ${status === 'approved' ? 'aprobado' : 'rechazado'} correctamente`);
      loadCertificates(); // Recargar lista
    } catch (error) {
      console.error('Error revisando certificado:', error);
      alert('Error al procesar la solicitud');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'status-pending', text: 'Pendiente' },
      approved: { class: 'status-approved', text: 'Aprobado' },
      rejected: { class: 'status-rejected', text: 'Rechazado' }
    };
    
    const config = statusConfig[status];
    return <span className={`status-badge ${config.class}`}>{config.text}</span>;
  };

  if (loading) {
    return <div className="loading">Cargando certificados...</div>;
  }

  return (
    <div className="management-section">
      <div className="section-header">
        <h1>Gestión de Certificados</h1>
        <p>Revisa y aprueba los certificados subidos por los profesores</p>
      </div>

      {/* Filtros */}
      <div className="filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Todos
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
          Aprobados
        </button>
        <button 
          className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
          onClick={() => setFilter('rejected')}
        >
          Rechazados
        </button>
      </div>

      {/* Lista de Certificados */}
      <div className="certificates-list">
        {certificates.length === 0 ? (
          <div className="empty-state">
            <p>No hay certificados {filter !== 'all' ? `con estado ${filter}` : ''}</p>
          </div>
        ) : (
          certificates.map(certificate => (
            <div key={certificate.id} className="certificate-card">
              <div className="certificate-info">
                <h3>{certificate.title}</h3>
                <div className="certificate-details">
                  <p><strong>Institución:</strong> {certificate.institution}</p>
                  <p><strong>Profesor:</strong> {certificate.teacherName}</p>
                  <p><strong>Fecha:</strong> {new Date(certificate.issueDate).toLocaleDateString()}</p>
                  <p><strong>Tipo:</strong> {certificate.type}</p>
                </div>
                <div className="certificate-status">
                  {getStatusBadge(certificate.status)}
                </div>
              </div>
              
              <div className="certificate-actions">
                <a 
                  href={certificate.fileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-view"
                >
                   Ver Certificado
                </a>
                
                {certificate.status === 'pending' && (
                  <div className="review-actions">
                    <button 
                      className="btn-approve"
                      onClick={() => handleReview(certificate.id, 'approved')}
                    >
                       Aprobar
                    </button>
                    <button 
                      className="btn-reject"
                      onClick={() => {
                        const comments = prompt('Motivo del rechazo:');
                        if (comments) {
                          handleReview(certificate.id, 'rejected', comments);
                        }
                      }}
                    >
                       Rechazar
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CertificatesManagement;