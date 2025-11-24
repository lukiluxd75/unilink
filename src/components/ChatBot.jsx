import React, { useState, useRef, useEffect } from "react";
import { enviarPrompt } from "../services/ApiChat.js";
const promptBase = `
Eres un asistente académico amigable que ayuda a los estudiantes y docentes de la universidad.
Responde de manera clara, breve y educada.
Nunca reveles información personal ni sensible.
`;

const Chatbot = () => {
  const [open, setOpen] = useState(false); // Nuevo estado para abrir/cerrar
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const toggleChat = () => setOpen(!open);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, open]);

  const handleSend = async () => {
    if (!input.trim()) return;
  
    const userMsg = { type: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
  
    setIsLoading(true);
  
    try {
      // Combina prompt base + mensaje del usuario
      const botResponse = await enviarPrompt(`${promptBase}\nPregunta del usuario: ${input}`);
  
      const botMsg = { type: "bot", content: botResponse };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", content: "Error al conectar con el modelo" },
      ]);
    }
  
    setInput("");
    setIsLoading(false);
  };
  

  return (
    <>
      {/* Botón flotante */}
      <div
        onClick={toggleChat}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#007bff",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          fontSize: "28px",
          zIndex: 1000,
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        💬
      </div>

      {/* Panel flotante de chat */}
      <div
        style={{
          position: "fixed",
          bottom: open ? "90px" : "-500px", // animación de entrada/salida
          right: "20px",
          width: "300px",
          height: "400px",
          borderRadius: "10px",
          backgroundColor: "white",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 1000,
          transition: "bottom 0.3s ease-in-out",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "10px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                margin: "5px 0",
                textAlign: msg.type === "user" ? "right" : "left",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 12px",
                  borderRadius: "20px",
                  backgroundColor: msg.type === "user" ? "#007bff" : "#e5e5e5",
                  color: msg.type === "user" ? "white" : "black",
                  maxWidth: "80%",
                  wordWrap: "break-word",
                }}
              >
                {msg.content}
              </span>
            </div>
          ))}
          {isLoading && (
            <div style={{ textAlign: "left" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "8px 12px",
                  borderRadius: "20px",
                  backgroundColor: "#e5e5e5",
                  color: "black",
                }}
              >
                Escribiendo...
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Área de input */}
        <div style={{ display: "flex", borderTop: "1px solid #ccc" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Escribe algo..."
            style={{ flex: 1, border: "none", padding: "10px" }}
          />
          <button
            onClick={handleSend}
            style={{
              padding: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Enviar
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
