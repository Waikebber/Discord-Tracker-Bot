/**
 * Format a Reddit post or subreddit update for Discord.
 * @param {{author?: string, title: string, permalink: string}} post
 * @param {string} subreddit
 * @param {boolean} wildcard  // true if posting newest regardless of author
 * @returns {string}
 */
export function formatRedditMessage(post, subreddit, wildcard = false) {
    const userPart = wildcard
        ? `**New in r/${subreddit}:**`
        : `:reddit: **r/${subreddit} • u/${post.author}**`;
    return `${userPart}
    **${post.title}**
    https://reddit.com${post.permalink}`;
}