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
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userMessage })
    });

    if (!response.ok) {
      throw new Error('Server error');
    }

    const data = await response.json();
    appendMessage('Arcana', data.reply);
  } catch (error) {
    appendMessage('Arcana', '⚠️ I lost connection to the Logos. Try again.');
    console.error(error);
  }
});

function appendMessage(sender, text) {
  const messageEl = document.createElement('div');
  messageEl.className = 'message';
  messageEl.innerHTML = `<strong>${sender}:</strong> ${text}`;
  messages.appendChild(messageEl);
  messages.scrollTop = messages.scrollHeight;
}
