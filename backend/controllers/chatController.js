export const processChat = async (req, res) => {
    const { prompt } = req.body;
  
    try {
      const response = await fetch("http://127.0.0.1:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "gemma3:latest", prompt, stream: false }),
      });
  
      const data = await response.json();
      res.json({ response: data.response });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Error comunicando con Ollama" });
    }
  };
  