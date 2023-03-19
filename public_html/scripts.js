const chatWindow = document.getElementById('chat-window');
const aliasInput = document.getElementById('alias');
const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', async () => {
  const alias = aliasInput.value;
  const message = messageInput.value;

  if (!alias || !message) return;

  await fetch('/chats/post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ alias, message }),
  });

  messageInput.value = '';
});

async function fetchMessages() {
  const response = await fetch('/chats');
  const messages = await response.json();
  displayMessages(messages);
}

function displayMessages(messages) {
  chatWindow.innerHTML = '';
  messages.forEach((message) => {
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `<strong>${message.alias}:</strong> ${message.message}`;
    chatWindow.appendChild(messageElement);
  });
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

setInterval(fetchMessages, 1000);
