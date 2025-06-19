// A simple script to send a test message to a Discord channel.
// Usage:
//   node scripts/test-send.js <CHANNEL_ID> ["Your test message here"]
// Or set environment variables:
//   DISCORD_TOKEN, TEST_CHANNEL_ID, TEST_MESSAGE

import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';

(async () => {
  const token     = process.env.DISCORD_TOKEN;
  const channelId = process.argv[2] || process.env.TEST_CHANNEL_ID;
  const content   = process.argv[3] || process.env.TEST_MESSAGE || '🚀 This is a test message!';

  if (!token) {
    console.error('🛑 Missing DISCORD_TOKEN environment variable');
    process.exit(1);
  }
  if (!channelId) {
    console.error('🛑 Missing channel ID. Provide as first argument or set TEST_CHANNEL_ID');
    process.exit(1);
  }

  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  try {
    await client.login(token);
    console.log(`✅ Logged in as ${client.user.tag}`);

    const channel = await client.channels.fetch(channelId);
    if (!channel || typeof channel.send !== 'function') {
      console.error('🛑 Invalid channel ID or channel cannot send messages');
      process.exit(1);
    }

    const sent = await channel.send(content);
    console.log(`✉️ Message sent (ID: ${sent.id})`);
  } catch (err) {
    console.error('❌ Error sending test message:', err);
  } finally {
    client.destroy();
  }
})();
