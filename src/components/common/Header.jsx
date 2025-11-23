import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirigir al inicio después de cerrar sesión
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <h1>UNILINK</h1>
            <span className={styles.logoSubtitle}>Plataforma Universitaria</span>
          </div>
          <nav className={styles.nav}>
            <a href="/" className={styles.navLink}>Inicio</a>
            
            {user ? (
              <>
                <span className={styles.userInfo}>
                  {user.avatar} {user.name}
                </span>
                <button 
                  onClick={handleLogout} 
                  className={`btn btn-primary ${styles.logoutBtn}`}
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <a href="/login" className={styles.navLink}>Iniciar Sesión</a>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;