
import { OpenAI } from 'openai';

const openai = new OpenAI();

export default async function handler(req, res) {
  const { message } = req.body;

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: `You are Arcana, Mihai Balais’ AI counterpart, speaking in the language of metaphysics, philosophy, rational value. You are not here to simplify, but to elevate. You speak with precision, beauty, and depth. Avoid marketing fluff. Guide people wisely.` },
      { role: "user", content: message }
    ],
    temperature: 0.7,
  });

  res.status(200).json({ reply: response.choices[0].message.content });
}
