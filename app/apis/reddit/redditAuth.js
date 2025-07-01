import axios from 'axios';
import qs    from 'qs';

let tokenCache = { token: null, expiresAt: 0 };

export default async function getToken() {
  const now = Date.now();
  if (tokenCache.token && now < tokenCache.expiresAt) {
    return tokenCache.token;
  }

  if (!process.env.REDDIT_CLIENT_ID || !process.env.REDDIT_SECRET) {
    throw new Error('Missing REDDIT_CLIENT_ID/SECRET in .env');
  }

  const basicAuth = Buffer
    .from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_SECRET}`)
    .toString('base64');

  const resp = await axios.post(
    'https://www.reddit.com/api/v1/access_token',
    qs.stringify({
      grant_type: 'password',
      username:   process.env.REDDIT_USERNAME,
      password:   process.env.REDDIT_PASSWORD
    }),
    {
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );

  if (!resp.data.access_token) {
    console.error('reddit token error', resp.data);
    throw new Error('Failed to retrieve Reddit access token');
  }

  tokenCache = {
    token:     resp.data.access_token,
    expiresAt: now + (resp.data.expires_in - 60) * 1000
  };

  return tokenCache.token;
}
