import 'dotenv/config';
import express from 'express';
import { startBot } from './app/discord/bot.js';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (_req, res) => res.send('OK'));
app.listen(port, () => {
  console.log(`HTTP server listening on port ${port}`);
});

startBot()
  .catch(err => {
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\nBot failed to start:', err);
    process.exit(1);
  });
