export async function generateWithOpenRouter(prompt) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.openRouterApiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000", // required
      "X-Title": "FitAI Plan Generator",
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3.1-70b-instruct", // ✅ excellent JSON output
      messages: [
        {
          role: "system",
          content:
            "You are a fitness trainer and nutritionist. Return ONLY valid JSON. No markdown.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error("OpenRouter failed: " + err);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}
