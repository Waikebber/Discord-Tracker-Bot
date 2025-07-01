import api      from '../rateLimitedAxios.js';
import getToken from './redditAuth.js';

export default async function fetchReddit(subreddit, username) {
  const bearer = await getToken();
  const base   = 'https://oauth.reddit.com';

  let path, params;
  if (username) {
    path   = `/r/${subreddit}/search`;
    params = { q: `author:${username}`, restrict_sr: 1, sort: 'new', limit: 1 };
  } else {
    path   = `/r/${subreddit}/new`;
    params = { limit: 1 };
  }

  const resp = await api.get(base + path, {
    params,
    headers: {
      Authorization: `Bearer ${bearer}`,
      'User-Agent': `windows:Discord-Tracker-Bot:1.0 (by /u/${process.env.REDDIT_USERNAME})`
    }
  });

  const children = resp.data.data.children;
  if (!children.length) return null;
  const d = children[0].data;
  return {
    id:        d.name,
    author:    d.author,
    title:     d.title,
    selftext:  d.selftext,
    permalink: d.permalink
  };
}
