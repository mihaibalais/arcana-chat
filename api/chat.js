export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { message } = req.body;

  try {
    const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7
      })
    });

    const data = await apiRes.json();

    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({ reply: "Arcana could not answer. No data received." });
    }

    const reply = data.choices[0].message.content.trim();
    res.status(200).json({ reply });

  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ reply: "Arcana is confused. The gods of the backend did not respond well." });
  }
}
