export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    // Log for debugging
    console.log('OpenAI response:', JSON.stringify(data, null, 2));

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return res.status(500).json({ reply: 'Arcana could not answer. No data received.' });
    }

    const reply = data.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ reply: 'Arcana encountered an error.' });
  }
}
