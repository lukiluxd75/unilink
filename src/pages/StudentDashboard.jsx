import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/common/Header';
import OpportunityCard from '../components/students/OpportunityCard';
import styles from './StudentDashboard.module.css';
import { useState } from 'react';
// Datos de ejemplo para oportunidades
const mockOpportunities = [
  {
    id: 1,
    title: 'Ayudantía en Cálculo I',
    type: 'Ayudantía',
    description: 'Se busca ayudante para la cátedra de Cálculo I. Debe tener disponibilidad para 10 horas semanales.',
    deadline: '2024-03-15',
    vacancies: 2,
    requirements: {
      minGrade: 4.0,
      minSemester: 3,
      allowedCareers: ['Ingeniería', 'Matemáticas', 'Física']
    }
  },
  {
    id: 2,
    title: 'Pasantía en Desarrollo Web',
    type: 'Pasantía',
    description: 'Pasantía remunerada en desarrollo web frontend con React. Duración: 6 meses.',
    deadline: '2024-04-01',
    vacancies: 5,
    requirements: {
      minGrade: 3.8,
      minSemester: 5,
      allowedCareers: ['Ingeniería', 'Sistemas', 'Informática']
    }
  },
  {
    id: 3,
    title: 'Beca de Excelencia Académica',
    type: 'Beca',
    description: 'Beca para estudiantes con excelente rendimiento académico. Cubre el 50% de la matrícula.',
    deadline: '2024-03-30',
    vacancies: 10,
    requirements: {
      minGrade: 4.5,
      minSemester: 2,
      allowedCareers: ['Todas']
    }
  },
  {
    id: 4,
    title: 'Ayudantía en Programación II',
    type: 'Ayudantía',
    description: 'Ayudante para laboratorios de Programación II. Conocimientos en Java requeridos.',
    deadline: '2024-03-20',
    vacancies: 3,
    requirements: {
      minGrade: 4.2,
      minSemester: 4,
      allowedCareers: ['Ingeniería', 'Sistemas', 'Informática']
    }
  }
];

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [applications, setApplications] = useState([]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const student = {
    grade: 4.2,
    semester: 4,
    career: 'Ingeniería'
  };

  const handleApplication = (opportunityId) => {
    if (applications.includes(opportunityId)) {
      alert('Ya te has postulado a esta oportunidad.');
      return;
    }
    setApplications(prev => [...prev, opportunityId]);
    console.log(`Postulando a oportunidad ${opportunityId}`);
    alert(`¡Postulación enviada a la oportunidad ${opportunityId} exitosamente!`);
  };
  const filteredOpportunities = mockOpportunities.filter(opp => {
    if (filter === 'all') return true;
    return opp.type === filter;
  });

  return (
    <div className={styles.dashboard}>
      <Header />
      <div className="container">
        <div className={styles.welcomeSection}>
          <h1>Bienvenido, {user?.name} </h1>
          <p>Dashboard de Estudiante - Encuentra oportunidades académicas y postula fácilmente</p>
  
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '30px'
          }}>
            <button className="btn-consistent">
              Ver Oportunidades
            </button>
            <button className="btn-consistent">
              Mis Postulaciones
            </button>
            <button onClick={handleLogout} className="btn-consistent">
              Cerrar Sesión
            </button>
          </div>

          <div className={styles.studentInfo}>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Promedio</span>
              <span className={styles.infoValue}>{student.grade}</span>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Semestre</span>
              <span className={styles.infoValue}>{student.semester}</span>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Carrera</span>
              <span className={styles.infoValue}>{student.career}</span>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Postulaciones</span>
              <span className={styles.infoValue}>{applications.length}</span>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Oportunidades Disponibles</h3>
            <p className={styles.statNumber}>{filteredOpportunities.length}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Postulaciones Enviadas</h3>
            <p className={styles.statNumber}>{applications.length}</p>
          </div>
          <div className={styles.statCard}>
            <h3>Postulaciones Aprobadas</h3>
            <p className={styles.statNumber}>0</p>
          </div>
        </div>

        {/* Opportunities Section */}
        <section className={styles.opportunitiesSection}>
          <h2 className={styles.sectionTitle}>Oportunidades Disponibles</h2>
          <p className={styles.sectionSubtitle}>
            Postúlate a ayudantías, pasantías y becas. El sistema verificará automáticamente si cumples los requisitos.
          </p>

          {/* Filtros */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '30px',
            flexWrap: 'wrap'
          }}>
            <button 
              className={filter === 'all' ? 'btn-modern' : 'btn-modern-outline'} 
              style={{padding: '10px 20px', fontSize: '0.9rem'}}
              onClick={() => setFilter('all')}
            >
              Todas
            </button>
            <button 
              className={filter === 'Ayudantía' ? 'btn-modern' : 'btn-modern-outline'} 
              style={{padding: '10px 20px', fontSize: '0.9rem'}}
              onClick={() => setFilter('Ayudantía')}
            >
              Ayudantías
            </button>
            <button 
              className={filter === 'Pasantía' ? 'btn-modern' : 'btn-modern-outline'} 
              style={{padding: '10px 20px', fontSize: '0.9rem'}}
              onClick={() => setFilter('Pasantía')}
            >
              Pasantías
            </button>
            <button 
              className={filter === 'Beca' ? 'btn-modern' : 'btn-modern-outline'} 
              style={{padding: '10px 20px', fontSize: '0.9rem'}}
              onClick={() => setFilter('Beca')}
            >
              Becas
            </button>
          </div>
          
          <div className={styles.opportunitiesList}>
            {filteredOpportunities.map(opportunity => (
              <OpportunityCard 
                key={opportunity.id}
                opportunity={opportunity}
                student={student}
                onApply={handleApplication}
                isApplied={applications.includes(opportunity.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StudentDashboard;