const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const messages = document.getElementById('chat-messages');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('You', userMessage);
  input.value = '';
  
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await res.json();
    appendMessage('Arcana', data.reply);
  } catch (err) {
    appendMessage('Arcana', 'Oops. Something went wrong.');
  }
});

function appendMessage(sender, text) {
  const message = document.createElement('div');
  message.className = 'message';
  message.innerHTML = `<strong>${sender}:</strong> ${text}`;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}
