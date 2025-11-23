import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/common/Header';
import styles from './TeacherDashboard.module.css';
import { useState, useEffect } from 'react';

const TeacherDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Estados para la funcionalidad
  const [certificates, setCertificates] = useState([]);
  const [activeModal, setActiveModal] = useState(null); // null, 'upload', 'certificates', 'students'
  const [newCertificate, setNewCertificate] = useState({
    title: '',
    institution: '',
    issueDate: '',
    type: 'course',
    file: null
  });
  const [students, setStudents] = useState([]);

  // Datos de ejemplo para estudiantes
  const mockStudents = [
    { id: 1, name: 'Ana García', semester: 5, grade: 4.5, career: 'Ingeniería', status: 'active' },
    { id: 2, name: 'Luis Pérez', semester: 6, grade: 4.2, career: 'Ingeniería', status: 'active' },
    { id: 3, name: 'Marta López', semester: 4, grade: 4.8, career: 'Matemáticas', status: 'active' },
    { id: 4, name: 'Carlos Rodríguez', semester: 7, grade: 4.0, career: 'Física', status: 'inactive' }
  ];

  // Cargar datos iniciales
  useEffect(() => {
    const savedCertificates = JSON.parse(localStorage.getItem('teacherCertificates')) || [];
    setCertificates(savedCertificates);
    setStudents(mockStudents);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Funciones para abrir y cerrar modales
  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
    // Reset del formulario de certificado al cerrar
    setNewCertificate({
      title: '',
      institution: '',
      issueDate: '',
      type: 'course',
      file: null
    });
  };

  // Función para subir certificado
  const handleUploadCertificate = () => {
    if (!newCertificate.title || !newCertificate.institution || !newCertificate.issueDate) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    const certificate = {
      id: Date.now(), // Usar timestamp para ID único
      ...newCertificate,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      fileName: newCertificate.file ? newCertificate.file.name : 'documento.pdf'
    };

    const updatedCertificates = [...certificates, certificate];
    setCertificates(updatedCertificates);
    localStorage.setItem('teacherCertificates', JSON.stringify(updatedCertificates));
    
    closeModal();
    alert('Certificado subido exitosamente. Está pendiente de aprobación.');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCertificate(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setNewCertificate(prev => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const handleDeleteCertificate = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este certificado?')) {
      const updatedCertificates = certificates.filter(cert => cert.id !== id);
      setCertificates(updatedCertificates);
      localStorage.setItem('teacherCertificates', JSON.stringify(updatedCertificates));
    }
  };

  // Estadísticas en tiempo real
  const teacherStats = {
    certificatesUploaded: certificates.length,
    certificatesPending: certificates.filter(cert => cert.status === 'pending').length,
    certificatesApproved: certificates.filter(cert => cert.status === 'approved').length,
    studentsSupervised: students.filter(student => student.status === 'active').length
  };

  return (
    <div className={styles.dashboard}>
      <Header />
      <div className="container">
        {/* Welcome Section */}
        <div className={styles.welcomeSection}>
          <h1>Bienvenido, {user?.name}</h1>
          <p>Dashboard de Docente - Gestiona tu perfil profesional y certificados</p>
          
          <div className={styles.dashboardActions}>
            <button 
              onClick={() => openModal('upload')} 
              className={`${styles.actionBtn} ${styles.primaryBtn}`}
            >
              📤 Subir Certificado
            </button>
            <button 
              onClick={() => openModal('certificates')} 
              className={styles.actionBtn}
            >
              📋 Ver Certificados ({certificates.length})
            </button>
            <button 
              onClick={() => openModal('students')} 
              className={styles.actionBtn}
            >
              👨‍🎓 Ver Estudiantes ({teacherStats.studentsSupervised})
            </button>
            <button onClick={handleLogout} className={`${styles.actionBtn} ${styles.logoutBtn}`}>
              🔒 Cerrar Sesión
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Certificados Subidos</h3>
            <p className={styles.statNumber}>{teacherStats.certificatesUploaded}</p>
            <span className={styles.statTrend}>
              {certificates.length > 0 ? '+2 este mes' : 'Sin certificados'}
            </span>
          </div>
          <div className={styles.statCard}>
            <h3>Certificados Pendientes</h3>
            <p className={styles.statNumber}>{teacherStats.certificatesPending}</p>
            <span className={styles.statTrend}>En revisión</span>
          </div>
          <div className={styles.statCard}>
            <h3>Certificados Aprobados</h3>
            <p className={styles.statNumber}>{teacherStats.certificatesApproved}</p>
            <span className={styles.statTrend}>✓ Verificados</span>
          </div>
          <div className={styles.statCard}>
            <h3>Estudiantes Supervisados</h3>
            <p className={styles.statNumber}>{teacherStats.studentsSupervised}</p>
            <span className={styles.statTrend}>Activos</span>
          </div>
        </div>

        {/* Quick Actions */}
        <section className={styles.quickActions}>
          <h2 className={styles.sectionTitle}>Acciones Rápidas</h2>
          <div className={styles.actionsGrid}>
            <div className={styles.actionCard}>
              <div className={styles.actionIcon}>📤</div>
              <h4>Subir Certificado</h4>
              <p>Agrega un nuevo certificado o capacitación a tu perfil</p>
              <button 
                onClick={() => openModal('upload')}
                className={styles.primaryBtn}
              >
                Subir Ahora
              </button>
            </div>
            
            <div className={styles.actionCard}>
              <div className={styles.actionIcon}>📋</div>
              <h4>Gestionar Certificados</h4>
              <p>Revisa y organiza todos tus certificados subidos</p>
              <button 
                onClick={() => openModal('certificates')}
                className={styles.secondaryBtn}
              >
                Ver Lista
              </button>
            </div>
            
            <div className={styles.actionCard}>
              <div className={styles.actionIcon}>👨‍🎓</div>
              <h4>Estudiantes Asignados</h4>
              <p>Revisa los estudiantes bajo tu supervisión</p>
              <button 
                onClick={() => openModal('students')}
                className={styles.secondaryBtn}
              >
                Ver Estudiantes
              </button>
            </div>
            
            <div className={styles.actionCard}>
              <div className={styles.actionIcon}>⚙️</div>
              <h4>Configuración</h4>
              <p>Personaliza tu perfil y preferencias</p>
              <button 
                onClick={() => alert('Funcionalidad de configuración en desarrollo')}
                className={styles.secondaryBtn}
              >
                Configurar
              </button>
            </div>
          </div>
        </section>

        {/* Modal para Subir Certificado */}
        {activeModal === 'upload' && (
          <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <h2>Subir Nuevo Certificado</h2>
              
              <div className={styles.formGroup}>
                <label>Título del Certificado *</label>
                <input
                  type="text"
                  name="title"
                  value={newCertificate.title}
                  onChange={handleInputChange}
                  placeholder="Ej: Curso de React Avanzado"
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Institución *</label>
                <input
                  type="text"
                  name="institution"
                  value={newCertificate.institution}
                  onChange={handleInputChange}
                  placeholder="Ej: Universidad Nacional"
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Fecha de Emisión *</label>
                <input
                  type="date"
                  name="issueDate"
                  value={newCertificate.issueDate}
                  onChange={handleInputChange}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Tipo de Certificado</label>
                <select
                  name="type"
                  value={newCertificate.type}
                  onChange={handleInputChange}
                  className={styles.formInput}
                >
                  <option value="course">Curso</option>
                  <option value="diploma">Diplomado</option>
                  <option value="certification">Certificación</option>
                  <option value="workshop">Taller</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Archivo del Certificado</label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.png"
                  onChange={handleFileChange}
                  className={styles.fileInput}
                />
                {newCertificate.file && (
                  <div className={styles.fileName}>Archivo seleccionado: {newCertificate.file.name}</div>
                )}
              </div>

              <div className={styles.modalActions}>
                <button 
                  onClick={closeModal}
                  className={styles.secondaryBtn}
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleUploadCertificate}
                  className={styles.primaryBtn}
                >
                  Subir Certificado
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal para Lista de Certificados */}
        {activeModal === 'certificates' && (
          <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <h2>Mis Certificados</h2>
              
              {certificates.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>No tienes certificados subidos</p>
                  <button 
                    onClick={() => {
                      closeModal();
                      openModal('upload');
                    }}
                    className={styles.primaryBtn}
                  >
                    Subir Primer Certificado
                  </button>
                </div>
              ) : (
                <div className={styles.certificatesList}>
                  {certificates.map(certificate => (
                    <div key={certificate.id} className={styles.certificateItem}>
                      <div className={styles.certificateInfo}>
                        <h4>{certificate.title}</h4>
                        <p>{certificate.institution} • {certificate.issueDate}</p>
                        <p>Tipo: {certificate.type}</p>
                      </div>
                      <div>
                        <span className={`${styles.status} ${styles[certificate.status]}`}>
                          {certificate.status === 'pending' ? 'Pendiente' : 'Aprobado'}
                        </span>
                      </div>
                      <button 
                        onClick={() => handleDeleteCertificate(certificate.id)}
                        className={styles.deleteBtn}
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className={styles.modalActions}>
                <button 
                  onClick={closeModal}
                  className={styles.primaryBtn}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal para Lista de Estudiantes */}
        {activeModal === 'students' && (
          <div className={styles.modalOverlay} onClick={closeModal}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <h2>Estudiantes Supervisados</h2>
              
              <div className={styles.studentsList}>
                {students.map(student => (
                  <div key={student.id} className={styles.studentItem}>
                    <div className={styles.studentInfo}>
                      <h4>{student.name}</h4>
                      <p>{student.career} • Semestre {student.semester}</p>
                      <div className={styles.studentStats}>
                        <span className={styles.studentStat}>Promedio: {student.grade}</span>
                      </div>
                    </div>
                    <div>
                      <span className={`${styles.status} ${styles[student.status]}`}>
                        {student.status === 'active' ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.modalActions}>
                <button 
                  onClick={closeModal}
                  className={styles.primaryBtn}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;