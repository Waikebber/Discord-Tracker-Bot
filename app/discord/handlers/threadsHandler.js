import { BaseHandler } from './baseHandler.js';
import fetchThreads from '../../apis/fetchThreads.js';
import { formatThreadMessage } from '../messages/threadFormatter.js';

export class ThreadsHandler extends BaseHandler {
    async seed(lastSeen) {
        const { user_posts } = this.watch;
        for (const u of user_posts) {
            const p = await fetchThreads(u);
            if (p) lastSeen[`threads:${u}`] = p.id;
        }
    }
    
    async poll(lastSeen, filterPost) {
        const out = [];
        for (const u of this.watch.user_posts) {
            const post = await fetchThreads(u);
            const key  = `threads:${u}`;
            if (post && post.id !== lastSeen[key] && filterPost(post.text, this.watch)) {
                const entry = { api: 'threads', identifier: u, text: post.text, permalink: post.permalink, recordedAt: new Date().toISOString() };
                const msg = formatThreadMessage({ username: post.username, text: post.text, permalink: post.permalink });
                out.push({ entry, msg, key });
                lastSeen[key] = post.id;
            }
        }
        return out;
    }
}
