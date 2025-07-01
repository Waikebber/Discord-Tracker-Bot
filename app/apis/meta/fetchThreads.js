import api from '../rateLimitedAxios.js';

const BASE_URL = 'https://graph.threads.net/v1.0';
const userIdCache = new Map();

async function resolveUserId(username) {
  if (userIdCache.has(username)) return userIdCache.get(username);
  const resp = await api.get(`${BASE_URL}/${username}`, {
    params: {
      access_token: process.env.THREADS_TOKEN,
      fields: 'id'
    }
  });
  const id = resp.data.id;
  userIdCache.set(username, id);
  return id;
}

export default async function fetchThreads(username) {
  const userId = await resolveUserId(username);
  const resp = await api.get(`${BASE_URL}/${userId}/new`, {
    params: {
      access_token: process.env.THREADS_TOKEN,
      limit: 1,
      fields: 'id,username,text,timestamp,permalink'
    }
  });
  const posts = resp.data.data || [];
  return posts.length ? posts[0] : null;
}
