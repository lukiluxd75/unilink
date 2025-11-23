// src/components/teachers/CertificateGallery.jsx
import React from 'react';
import styles from './CertificateGallery.module.css';

const CertificateGallery = ({ certificates }) => {
  return (
    <div className={styles.certificateGallery}>
      <h3 className={styles.sectionTitle}>Mis Certificados</h3>
      
      {certificates.length === 0 ? (
        <p className={styles.noCertificates}>Aún no has subido certificados.</p>
      ) : (
        <div className={styles.certificatesGrid}>
          {certificates.map(certificate => (
            <div key={certificate.id} className={styles.certificateCard}>
              <div className={styles.certificateInfo}>
                <h4>{certificate.name}</h4>
                <p>Fecha: {new Date(certificate.date).toLocaleDateString()}</p>
              </div>
              <div className={styles.certificateActions}>
                <button className={styles.viewBtn}>Ver</button>
                <button className={styles.downloadBtn}>Descargar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificateGallery;