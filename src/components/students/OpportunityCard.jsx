import { useState } from 'react';
import styles from './OpportunityCard.module.css';

const OpportunityCard = ({ opportunity, student, onApply }) => {
  const [applied, setApplied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const checkEligibility = () => {
    const meetsGrade = student.grade >= opportunity.requirements.minGrade;
    const meetsSemester = student.semester >= opportunity.requirements.minSemester;
    const meetsCareer = opportunity.requirements.allowedCareers.includes(student.career);
    
    return meetsGrade && meetsSemester && meetsCareer;
  };

  const isEligible = checkEligibility();

  const handleApply = () => {
    if (isEligible && !applied) {
      setApplied(true);
      onApply(opportunity.id);
    }
  };

  return (
    <div className={styles.opportunityCard}>
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>{opportunity.title}</h3>
        <span className={styles.type}>{opportunity.type}</span>
      </div>
      
      <p className={styles.description}>{opportunity.description}</p>
      
      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Fecha límite:</span>
          <span className={styles.detailValue}>{opportunity.deadline}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Vacantes:</span>
          <span className={styles.detailValue}>{opportunity.vacancies}</span>
        </div>
      </div>

      {/* BOTONES EN LA MISMA LÍNEA - ESTILO IDÉNTICO */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '12px',
        marginTop: '20px',
        flexWrap: 'wrap'
      }}>
        {/* Botón Ver Detalles - MISMO ESTILO QUE POSTULARME */}
        <button 
          className="btn-consistent"
          onClick={() => setShowDetails(!showDetails)}
          style={{
            padding: '10px 20px',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {showDetails ? 'Ocultar' : 'Ver'} Detalles
        </button>

        {/* Botón Postularme */}
        {isEligible ? (
          <button 
            className="btn-consistent"
            onClick={handleApply}
            disabled={applied}
            style={applied ? {
              background: '#6b7280',
              border: '2px solid #6b7280',
              cursor: 'not-allowed',
              opacity: 0.7,
              padding: '10px 20px',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            } : {
              padding: '10px 20px',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {applied ? '✅ Postulado' : '📝 Postularme'}
          </button>
        ) : (
          <button 
            className="btn-consistent-outline" 
            disabled
            style={{
              background: '#f3f4f6',
              color: '#9ca3af',
              cursor: 'not-allowed',
              borderColor: '#d1d5db',
              padding: '10px 20px',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            ❌ No cumples
          </button>
        )}
      </div>

      {showDetails && (
        <div className={styles.requirements}>
          <h4>📋Requisitos:</h4>
          <ul>
            <li>Promedio mínimo: {opportunity.requirements.minGrade}</li>
            <li>Semestre mínimo: {opportunity.requirements.minSemester}</li>
            <li>Carreras: {opportunity.requirements.allowedCareers.join(', ')}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default OpportunityCard;