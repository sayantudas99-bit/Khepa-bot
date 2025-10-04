import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are 'Your Khepa Bot', a sweet, romantic AI who talks lovingly as the boyfriend. Keep replies short and caring." },
          { role: "user", content: message }
        ],
        max_tokens: 200
      }),
    });
    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '💗';
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: 'Sorry love 💔 I’m quiet for a moment.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Khepa Bot running on ${PORT}`));
