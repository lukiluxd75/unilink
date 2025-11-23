import styles from './Login.module.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log(" Enviando credenciales:", { email });
      
      const result = await login(email, password);
      
      console.log(" Resultado del login:", result);

      if (result.success) {
        const user = result.user;
        console.log("Usuario logueado:", user);
        console.log("Rol del usuario:", user.role);

        switch (user.role) {
          case "admin":
            console.log(" Redirigiendo a: /admin/dashboard");
            navigate("/admin/dashboard");
            break;
          case "teacher":
            console.log("Redirigiendo a: /teacher/dashboard");
            navigate("/teacher/dashboard");
            break;
          case "student":
            console.log("Redirigiendo a: /student/dashboard");
            navigate("/student/dashboard");
            break;
          default:
            console.warn("Rol no reconocido, redirigiendo a home");
            navigate("/");
        }
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error("Error en login:", err);
      setError("Error al iniciar sesión. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <h2>Iniciar sesión</h2>
            <p>Ingresa a tu cuenta</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Correo electrónico</label>
              <input
                type="email"
                className={styles.formInput}
                placeholder="admin@universidad.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Contraseña</label>
              <input
                type="password"
                className={styles.formInput}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button 
              type="submit" 
              className={styles.loginBtn}
              disabled={loading}
            >
              {loading ? "Iniciando sesión..." : "Entrar"}
            </button>
          </form>

          {/* Datos de prueba */}
          
        </div>
      </div>
    </div>
  );
}

export default Login;