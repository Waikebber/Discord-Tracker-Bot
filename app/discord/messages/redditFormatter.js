// src/discord/messages/redditFormatter.js
import { EmbedBuilder } from 'discord.js';

/**
 * Build a Discord Embed for a Reddit post or subreddit update.
 * @param {{ author?: string, title: string, permalink: string }} post
 * @param {string} subreddit
 * @param {boolean} wildcard  // true if posting newest regardless of author
 * @returns {EmbedBuilder}
 */
export function formatRedditEmbed(post, subreddit, wildcard = false) {
  const url        = `https://reddit.com${post.permalink}`;
  const authorName = wildcard ? `r/${subreddit}` : `u/${post.author}`;
  const embed = new EmbedBuilder()
    .setTitle(post.title)
    .setURL(url)
    .setAuthor({
      name: authorName,
      iconURL: 'https://www.redditstatic.com/desktop2x/img/favicon/favicon-96x96.png'
    })
    .setColor('#FF5700')
    .setFooter({ text: `r/${subreddit}` })
    .setTimestamp();

  return embed;
}
