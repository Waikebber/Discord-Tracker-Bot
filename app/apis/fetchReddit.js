import api from './rateLimitedAxios.js';

/**
 * If `username` is provided, uses /search to find their newest post.
 * Otherwise grabs the newest post in the subreddit.
 */
export default async function fetchReddit(subreddit, username) {
  let url, params;

  if (username) {
    url = `https://www.reddit.com/r/${subreddit}/search.json`;
    params = {
      q:           `author:${username}`,
      restrict_sr: 1,
      sort:        'new',
      limit:       1
    };
  } else {
    url = `https://www.reddit.com/r/${subreddit}/new.json`;
    params = { limit: 1 };
  }

  const resp = await api.get(url, {
    params,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
                    'AppleWebKit/537.36 (KHTML, like Gecko) ' +
                    'Chrome/115.0.0.0 Safari/537.36'
    }
  });
  const children = resp.data.data.children;
  if (!children.length) return null;

  const data = children[0].data;
  return {
    id:        data.name,
    author:    data.author,
    title:     data.title,
    selftext:  data.selftext,
    permalink: data.permalink
  };
}
