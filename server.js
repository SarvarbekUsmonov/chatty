/*
  Author: Sarvarbek Usmonov
  File: server.js
  Purpose: Server side code for chat app.
  Uses mongoDB to store data, recieves get request, sends post requests.
*/

// Require the necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Create a new Express app
const app = express();

// Set the port number for the server
const PORT = process.env.PORT || 3000;

// Serve static files from the public_html directory
app.use(express.static('public_html'));

// Parse incoming JSON data with the body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up the MongoDB connection
const mongoURI = 'mongodb://127.0.0.1:27017/chatty';
mongoose.connection.on("connected", () => console.log("Connected"))
mongoose.connection.on("error", (err) => console.log(err))
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define the schema for the chat messages
const Schema = mongoose.Schema;
const ChatMessageSchema = new Schema({
  time: Number,
  alias: String,
  message: String,
});

// Create a new model for the chat messages
const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);

// Define a route to fetch all chat messages from the server
app.get('/chats', async (req, res) => {
  const messages = await ChatMessage.find().sort('time');
  res.json(messages);
});

// Define a route to post a new chat message to the server
app.post('/chats/post', async (req, res) => {
  const newMessage = new ChatMessage({
    time: Date.now(),
    alias: req.body.alias,
    message: req.body.message,
  });

  await newMessage.save();
  res.sendStatus(200);
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
