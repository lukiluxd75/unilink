// src/components/teachers/CertificateUpload.jsx
import React, { useState } from 'react';
import styles from './CertificateUpload.module.css';

const CertificateUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    // Simulamos una subida de archivo
    setTimeout(() => {
      alert('Certificado subido exitosamente');
      setFile(null);
      setUploading(false);
      // Limpiar el input de archivo
      e.target.reset();
    }, 2000);
  };

  return (
    <div className={styles.certificateUpload}>
      <h3 className={styles.sectionTitle}>Subir Certificado</h3>
      <form onSubmit={handleSubmit} className={styles.uploadForm}>
        <div className={styles.fileInputContainer}>
          <input 
            type="file" 
            onChange={handleFileChange}
            className={styles.fileInput}
            accept=".pdf,.jpg,.png"
            required
          />
          <div className={styles.fileInfo}>
            <p>Formatos aceptados: PDF, JPG, PNG</p>
            <p>Tamaño máximo: 10MB</p>
          </div>
        </div>
        <button 
          type="submit" 
          className={`btn btn-primary ${styles.uploadBtn}`}
          disabled={!file || uploading}
        >
          {uploading ? 'Subiendo...' : 'Subir Certificado'}
        </button>
      </form>
    </div>
  );
};

export default CertificateUpload;