import genAI from '@/lib/geminiClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { category } = req.body;

    if (!['lifestyle', 'posture', 'motivation'].includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
    });

    const promptMap = {
      lifestyle: 'Give one short healthy lifestyle tip.',
      posture: 'Give one posture correction tip.',
      motivation: 'Give one fitness motivation quote.',
    };

    const result = await model.generateContent(promptMap[category]);
    const tip = result.response.text().trim();

    res.status(200).json({
      success: true,
      tip,
      category,
      icon: { lifestyle: '🌟', posture: '🧘', motivation: '💪' }[category],
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate tip' });
  }
}
