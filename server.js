const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public_html'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoURI = 'mongodb://localhost:27017/chatty';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;
const ChatMessageSchema = new Schema({
  time: Number,
  alias: String,
  message: String,
});

const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);

app.get('/', (req, res) => {
  res.send("public_html");
})
app.get('/chats', async (req, res) => {
  const messages = await ChatMessage.find().sort('time');
  res.json(messages);
});

app.post('/chats/post', async (req, res) => {
  const newMessage = new ChatMessage({
    time: Date.now(),
    alias: req.body.alias,
    message: req.body.message,
  });

  await newMessage.save();
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
