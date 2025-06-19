import 'dotenv/config';
import fetchReddit from '../app/apis/fetchReddit.js';

(async () => {
  try {
    const subreddit = 'PokemonRestocks';
    const user      = 'TrackaLackerBot';
    const post      = await fetchReddit(subreddit, user);

    if (!post) {
      console.log(`No posts by u/${user} in r/${subreddit}`);
    } else {
      console.log('✅ Latest post:');
      console.log(`  id: ${post.id}`);
      console.log(`  title: ${post.title}`);
      console.log(`  link: https://reddit.com${post.permalink}`);
    }
  } catch (err) {
    console.error('❌ fetchReddit failed:', err);
  }
})();
