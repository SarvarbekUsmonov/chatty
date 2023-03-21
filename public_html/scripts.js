/*
  Author: Sarvarbek Usmonov
  File: scripts.js
  Purpose: Code for user side js. 
  Make requests to server and updates page when certain actions are done or
  in every 1s
*/

// Get references to the chat window, input fields, and send button
const chatWindow = document.getElementById('chat-window');
const aliasInput = document.getElementById('alias');
const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('send-btn');

// Add a click event listener to the send button
sendBtn.addEventListener('click', async () => {
  // Get the values from the input fields
  const alias = aliasInput.value;
  const message = messageInput.value;

  // If either input field is empty, do nothing and return
  if (!alias || !message) return;

  // Send a POST request with the alias and message in the request body
  await fetch('/chats/post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ alias, message }),
  });

  // Clear the message input field after sending the message
  messageInput.value = '';
});

// Define an async function to fetch the messages from the server
async function fetchMessages() {
  // Send a GET request to the server to fetch the messages
  const response = await fetch('/chats');
  const messages = await response.json();
  
  // Display the messages in the chat window
  displayMessages(messages);
}

// Define a function to display the messages in the chat window
function displayMessages(messages) {
  // Clear the chat window before displaying new messages
  chatWindow.innerHTML = '';

  // Loop through the messages and add each one to the chat window
  messages.forEach((message) => {
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `<strong>${message.alias}:</strong> ${message.message}`;
    chatWindow.appendChild(messageElement);
  });

  // Scroll to the bottom of the chat window to show the latest messages
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Call the fetchMessages function every second to update the chat window
setInterval(fetchMessages, 1000);
