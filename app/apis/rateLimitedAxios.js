import axios from 'axios';

// Create a single axios instance for all API calls
const api = axios.create();

// In-memory rate‐limit state:
let rate = {
  remaining: Infinity,
  resetAt: 0
};

// Capture rate headers on every response
api.interceptors.response.use(resp => {
  const used      = Number(resp.headers['x-ratelimit-used']);
  const remaining = Number(resp.headers['x-ratelimit-remaining']);
  const reset     = Number(resp.headers['x-ratelimit-reset']);

  if (!isNaN(remaining) && !isNaN(reset)) {
    rate.remaining = remaining;
    rate.resetAt   = Date.now() + reset * 1000;
  }
  return resp;
});

// Before each request, if we’ve exhausted our quota, pause till reset
api.interceptors.request.use(async config => {
  if (rate.remaining <= 0) {
    const wait = rate.resetAt - Date.now();
    if (wait > 0) {
      console.log(`⏳ Rate limit hit, waiting ${Math.ceil(wait/1000)}s…`);
      await new Promise(r => setTimeout(r, wait));
    }
  }
  return config;
});

export default api;
