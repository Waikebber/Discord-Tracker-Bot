# Discord-Tracker-Bot

A Discord bot that helps post messages in your Discord server by monitoring media posts and automatically sharing them in designated Discord channels.

## Features

- Monitor specific media and users and automatically post their updates to Discord
- Filter posts based on keywords
- Exclude posts containing specific words (unless they match keywords)
- Support for multiple channel configurations
- Real-time updates from media to Discord

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Waikebber/Discord-Tracker-Bot.git
cd Discord-Tracker-Bot
```

2. Install the required dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Discord bot and Meta Threads token:
```
DISCORD_TOKEN="your_discord_bot_token_here"
THREADS_TOKEN="your_threads_token_here"
```

4. Configure your bot settings in `app/configs/config.json`:
```json
{
  "enabledApis": ["reddit"], #whitelist apis
  "watches": [
    {
      "api": "reddit",
      "discord-text-channel": "Your Discord Channel ID",
      "subreddits": ["SubredditName"],
      "users": ["UsersToTrackInSubreddit"],
      "keywords": ["TrackThis", "AndThat"],
      "excluded": ["ButNotThis"]
    }
  ]
}
```

You can add multiple configurations by adding more objects to the JSON array.

## Usage

1. Start the bot:
```bash
npm start
```

2. The bot will automatically:
   - Monitor the specified Threads users
   - Filter posts based on your keywords
   - Exclude posts containing excluded words (unless they match keywords)
   - Post matching content to the specified Discord channel

## Test
Test whether it's extracting the right posts using your `config.json` and this script:
```
npm run start:test
```

## Configuration

### Channel Configuration
- `discord-text-channel`: The ID of the Discord channel where posts will be shared
- `user_posts`: List of Threads usernames to monitor
- `keywords`: List of keywords that posts must contain to be shared
- `excluded`: List of words that will cause a post to be ignored (unless it contains a keyword)

### .env and config.jsom
This is what your `.env` may look like:
```
DISCORD_TOKEN="YOUR_KEY_HERE"
THREADS_TOKEN="YOUR_KEY_HERE"

SERVER1_POKEMON_CHANNEL_ID="12344567890"

REDDIT_SECRET=""
REDDIT_CLIENT_ID=""
REDDIT_USERNAME=""
REDDIT_PASSWORD=""
```

And here's what the `app/configs/config.json` file may look like:
```json
{
  "enabledApis": ["reddit"], 
  "watches": [
    {
      "api": "reddit",
      "discord-text-channel": "SERVER1_POKEMON_CHANNEL_ID",
      "subreddits": ["PokemonRestocks"],
      "users": ["TrackaLackerBot"],
      "keywords": ["MSRP", "Price Drop", "Below MSRP"],
      "excluded": []
    }
  ]
}

```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Utilized Documentation:
### Meta Threads API
- [Retrieve and Discover Posts](https://developers.facebook.com/docs/threads/retrieve-and-discover-posts)
- [Retrieve User Posts](https://developers.facebook.com/docs/threads/retrieve-and-discover-posts/retrieve-posts)

### Reddit API
- [Reddit API](https://www.reddit.com/dev/api/)





