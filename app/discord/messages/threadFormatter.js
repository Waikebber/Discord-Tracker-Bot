/**
 * Format a Threads post for Discord.
 * @param {{username: string, text: string, permalink: string}} post
 * @returns {string}
 */
export function formatThreadMessage(post) {
    return `🧵 **${post.username}** just posted on Threads:
  ${post.text}
  ${post.permalink}`;
  }
  
  