import express from 'express';
import dotenv from 'dotenv';
import { generateAnalysis } from './controllers.js';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: '*', methods: 'GET,POST'}));

app.get('/api', (_, res) => {
  res.status(200).json({ message: 'API Running' });
});

app.post('/api/gen', async (req, res) => {
    const { uid, conversationId, userMessage } = req.body;
    if (!userMessage){
        res.status(400).json({ message: 'Message is required!' });
        return;
    }
    const analysis = await generateAnalysis(userMessage);
    const statusCode = analysis.error ? 500 : 200;
    res.status(statusCode).json(analysis);
});

app.post('/api/newConversation', (req, res) => {
  const { uid } = req.body;
  res.status(200).json({ id: '1234567890' });
});

app.get('/api/conversations', (_, res) => {
  const { uid, token } = req.body;
  // TODO: get conversation history from database
  res.status(200).json({ 
    conversations: [
      {
        id: "1",
        title:"",
        timestamp: "2025-01-01T01:00:00"
      }
    ]
  });
});

app.post('/api/conversations/:id', (req, res) => {
  const { uid, id } = req.params;
  res.status(200).json({
    conversationId: id,
    messages: [
      {
        id: "1",
        user: "user",
        text: "Hello",
        timestamp: "2025-01-01T01:00:00"
      },
      {
        id: "2",
        user: "bot",
        text: "Hi",
        stats:[],
        timestamp: "2025-01-01T01:01:00"
      }
    ]
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});