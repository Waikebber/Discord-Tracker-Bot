import {
  loadConfig,
  loadLastSeen,
  saveLastSeen,
  filterPost,
  recordTestPost,
  TEST_MODE,
  lastSeen
} from '../utils.js';
import { createHandler } from '../handlers/handlerFactory.js';

export const name = 'ready';

export async function execute(_, client) {
  console.log(`✅ Logged in as ${client.user.tag}`);

  const config   = loadConfig();
  const handlers = config.map(watch => createHandler(watch));
  loadLastSeen();

  for (const handler of handlers) {
    await handler.seed(lastSeen);
  }
  saveLastSeen();
  console.log('🔋 Seed complete — only future posts will be recorded.');

  // Poll loop every 15s
  setInterval(async () => {
    for (let i = 0; i < handlers.length; i++) {
      const handler = handlers[i];
      const watch   = config[i];

      // Skip Discord - test mode
      let channel;
      if (!TEST_MODE) {
        channel = await client.channels.fetch(watch['discord-text-channel']);
        if (!channel) continue;
      }

      const results = await handler.poll(lastSeen, filterPost);
      for (const { entry, embed } of results) {
        if (TEST_MODE) {
          recordTestPost(entry);
        } else {
          await channel.send({ embeds: [embed] });
        }
      }
    }
    saveLastSeen();
  }, 15_000);
}
