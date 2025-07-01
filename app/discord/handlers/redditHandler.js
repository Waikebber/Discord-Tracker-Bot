import { BaseHandler }     from './baseHandler.js';
import fetchReddit        from '../../apis/reddit/fetchReddit.js';
import { formatRedditEmbed } from '../messages/redditFormatter.js';

export class RedditHandler extends BaseHandler {
  async seed(lastSeen) {
    const { subreddits, users } = this.watch;
    for (const sr of subreddits) {
      if (!users.length) {
        const p = await fetchReddit(sr);
        if (p) lastSeen[`reddit:${sr}:*`] = p.id;
      } else {
        for (const u of users) {
          const p = await fetchReddit(sr, u);
          if (p) lastSeen[`reddit:${sr}:${u}`] = p.id;
        }
      }
    }
  }

  async poll(lastSeen, filterPost) {
    const out = [];
    const { subreddits, users } = this.watch;

    for (const sr of subreddits) {
      // wildcard (newest in subreddit)
      if (!users.length) {
        const post = await fetchReddit(sr);
        const key  = `reddit:${sr}:*`;
        if (post && post.id !== lastSeen[key] && filterPost(post.title, this.watch)) {
          const entry = {
            api:        'reddit',
            subreddit:  sr,
            user:       post.author,
            title:      post.title,
            permalink:  `https://reddit.com${post.permalink}`,
            recordedAt: new Date().toISOString()
          };
          const embed = formatRedditEmbed(post, sr, true);
          out.push({ entry, embed, key });
          lastSeen[key] = post.id;
        }

      // per-user fetch
      } else {
        for (const u of users) {
          const post = await fetchReddit(sr, u);
          const key  = `reddit:${sr}:${u}`;
          if (post && post.id !== lastSeen[key] && filterPost(post.title, this.watch)) {
            const entry = {
              api:        'reddit',
              subreddit:  sr,
              user:       u,
              title:      post.title,
              permalink:  `https://reddit.com${post.permalink}`,
              recordedAt: new Date().toISOString()
            };
            const embed = formatRedditEmbed(post, sr, false);
            out.push({ entry, embed, key });
            lastSeen[key] = post.id;
          }
        }
      }
    }

    return out;
  }
}
