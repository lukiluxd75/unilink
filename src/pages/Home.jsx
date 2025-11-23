import Header from '../components/common/Header';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.homePage}>
      <Header />
      
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Conectando la Comunidad Universitaria
            </h1>
            <p className={styles.heroDescription}>
              Una plataforma integral para docentes y estudiantes. 
              Gestiona tu desarrollo profesional y encuentra oportunidades académicas.
            </p>
            <div className={styles.heroButtons}>
              <a href="/login" className="btn-modern">Comenzar Ahora</a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>¿Qué ofrece UNILINK?</h2>
            <p className={styles.sectionSubtitle}>
              Descubre cómo UNILINK puede transformar tu experiencia universitaria
            </p>
          </div>
          <div className={styles.featuresGrid}>
            
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}></div>
              <h3>Para Docentes</h3>
              <p>
                Crea tu perfil digital profesional. Sube y organiza todos tus 
                certificados y capacitaciones en un solo lugar.
              </p>
              <ul className={styles.featureList}>
                <li>Portafolio digital de logros</li>
                <li>Fácil acceso a certificados</li>
                <li>Visibilidad de tu trayectoria</li>
              </ul>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}></div>
              <h3>Para Estudiantes</h3>
              <p>
                Descubre ayudantías, pasantías y becas. Postúlate fácilmente 
                y verifica si cumples los requisitos automáticamente.
              </p>
              <ul className={styles.featureList}>
                <li>Oportunidades académicas</li>
                <li>Verificación automática</li>
                <li>Postulaciones simplificadas</li>
              </ul>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}></div>
              <h3>Red Social Universitaria</h3>
              <p>
                Próximamente: Conecta con colegas, descubre oportunidades 
                en otras sedes y fortalece la comunidad universitaria.
              </p>
              <ul className={styles.featureList}>
                <li>Conexiones profesionales</li>
                <li>Oportunidades expandidas</li>
                <li>Comunidad activa</li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;