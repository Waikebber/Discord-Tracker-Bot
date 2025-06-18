import { Client, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import path from 'path';
import fetchThreads from './fetchThreads.js';

/**
 * Starts the Discord bot: sets up polling for latest Threads posts.
 */
export function startBot() {
  const configPath = path.join(process.cwd(), 'app', 'config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const lastSeenId = {}; // { username: lastPostId }

  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
  });

  client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
    setInterval(() => checkAll(config, client, lastSeenId), 60_000);
  });

  client.login(process.env.DISCORD_TOKEN);
}

/**
 * Polls each watched username and posts any new Threads into Discord.
 */
async function checkAll(config, client, lastSeenId) {
  for (const watch of config) {
    const channel = await client.channels.fetch(watch['discord-text-channel']);
    if (!channel) continue;

    for (const username of watch.user_posts) {
      try {
        const post = await fetchThreads(username);
        if (post && post.id !== lastSeenId[username]) {
          if (filterPost(post.text, watch)) {
            await channel.send(`**${post.username}**: ${post.text}\n${post.permalink}`);
          }
          lastSeenId[username] = post.id;
        }
      } catch (err) {
        console.error(`Error fetching ${username}:`, err.message);
      }
    }
  }
}

/**
 * Applies keyword and exclusion filters to post text.
 */
function filterPost(text, watch) {
  const lc = text.toLowerCase();
  const hasKeyword = !watch.keywords.length ||
    watch.keywords.some(k => lc.includes(k.toLowerCase()));
  const hasExcluded = watch.excluded.some(e => lc.includes(e.toLowerCase()));
  return hasKeyword && (!hasExcluded || watch.keywords.some(k => lc.includes(k.toLowerCase())));
}