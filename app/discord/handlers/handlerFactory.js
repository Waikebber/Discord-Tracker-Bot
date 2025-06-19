import { ThreadsHandler } from './threadsHandler.js';
import { RedditHandler  } from './redditHandler.js';

export function createHandler(watch) {
  switch(watch.api) {
    case 'threads': return new ThreadsHandler(watch);
    case 'reddit':  return new RedditHandler(watch);
    default:        throw new Error(`Unknown API: ${watch.api}`);
  }
}