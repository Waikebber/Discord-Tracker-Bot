import axios from 'axios';

const BASE_URL = 'https://graph.threads.net/v1.0';
const userIdCache = new Map();

/**
 * Resolves a Threads username to its numeric user ID via Graph API.
 * Caches results to avoid repeat lookups.
 */
async function resolveUserId(username) {
  if (userIdCache.has(username)) return userIdCache.get(username);
  const url = `${BASE_URL}/${username}`;
  const resp = await axios.get(url, {
    params: {
      access_token: process.env.THREADS_TOKEN,
      fields: 'id'
    }
  });
  const id = resp.data.id;
  userIdCache.set(username, id);
  return id;
}

/**
 * Fetches the single most recent Threads post for a given username using the /new endpoint.
 * @param {string} username
 * @returns {{post: Object|null}}
 */
export default async function fetchThreads(username) {
  const userId = await resolveUserId(username);
  const url = `${BASE_URL}/${userId}/new`;
  const params = {
    access_token: process.env.THREADS_TOKEN,
    limit: 1,
    fields: 'id,username,text,timestamp,permalink'
  };
  const resp = await axios.get(url, { params });
  const posts = resp.data.data || [];
  return posts.length ? posts[0] : null;
}