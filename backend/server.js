import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import applicationsRoutes from "./routes/applications.js";
import certificatesRoutes from "./routes/certificates.js";
import opportunitiesRoutes from "./routes/opportunities.js";
import chatRoutes from "./routes/chat.js";
import { pool, testConnection } from "./config/database.js";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Probar conexión BD
testConnection();

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/certificates", certificatesRoutes);
app.use("/api/opportunities", opportunitiesRoutes);
app.use("/api/applications", applicationsRoutes);
app.use("/api/chat", chatRoutes);

// Ruta health
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Servidor funcionando correctamente",
    timestamp: new Date().toISOString(),
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Algo salió mal en el servidor" });
});

// Rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
