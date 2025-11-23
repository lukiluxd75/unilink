import styles from './CertificateCard.module.css';

const CertificateCard = ({ certificate }) => {
  return (
    <div className={styles.certificateCard}>
      <div className={styles.iconContainer}>
        <span className={styles.icon}>📜</span>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{certificate.title}</h3>
          <span className={styles.status}>{certificate.status}</span>
        </div>
        <p className={styles.description}>{certificate.description}</p>
        
        <div className={styles.details}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Fecha de emisión:</span>
            <span className={styles.detailValue}>{certificate.issueDate}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Institución:</span>
            <span className={styles.detailValue}>{certificate.institution}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.viewBtn}>Ver Certificado</button>
          <button className={styles.downloadBtn}>Descargar</button>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;