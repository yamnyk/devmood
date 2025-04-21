import express, { Request, Response } from 'express';

import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello from DevMood Backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/test-env', (req: Request, res: Response) => {
  const openAiKey = process.env.OPENAI_API_KEY || 'FUCK';
  res.json({ openAiKey });
});
