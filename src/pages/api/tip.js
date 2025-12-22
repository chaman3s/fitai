import genAI from "@/lib/geminiClient";
let lastRequestTime = 0;
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }




  const { category } = req.body;

  if (!["lifestyle", "posture", "motivation"].includes(category)) {
    return res.status(400).json({ error: "Invalid category" });
  }

  const promptMap = {
    lifestyle: "Give one short healthy lifestyle tip.",
    posture: "Give one posture correction tip.",
    motivation: "Give one fitness motivation quote.",
  };

  const iconMap = {
    lifestyle: "🌟",
    posture: "🧘",
    motivation: "💪",
  };

  const prompt = promptMap[category];
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);
    const tip = result.response.text().trim();

    return res.status(200).json({
      success: true,
      provider: "gemini",
      tip,
      category,
      icon: iconMap[category],
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Gemini failed, switching to OpenRouter:", err);
  }

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.openRouterApiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "FitAI Tips",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [
            { role: "system", content: "You are a helpful fitness coach." },
            { role: "user", content: prompt },
          ],
          max_tokens: 120,
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || "OpenRouter failed");
    }

    const tip = data.choices[0].message.content.trim();

    return res.status(200).json({
      success: true,
      provider: "openrouter",
      tip,
      category,
      icon: iconMap[category],
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("OpenRouter error:", err);

    return res.status(503).json({
      error: "All AI providers are currently unavailable.",
    });
  }
}
