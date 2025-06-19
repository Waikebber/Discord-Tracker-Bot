import { Client, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import path from 'path';

export async function startBot() {
  const client = new Client({
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages ]
  });

  const eventsPath = path.join(process.cwd(), 'app/discord/events');
  for (const file of fs.readdirSync(eventsPath).filter(f => f.endsWith('.js'))) {
    const { name, execute } = await import(`./events/${file}`);
    if (name === 'ready') {
      client.once(name, (...args) => execute(...args, client));
    } else {
      client.on(name, (...args) => execute(...args, client));
    }
  }

  await client.login(process.env.DISCORD_TOKEN);
}
