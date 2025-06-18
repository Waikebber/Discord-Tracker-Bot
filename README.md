# Discord-Threads-Bot

A Discord bot that helps manage and organize threads in your Discord server by monitoring Threads posts and automatically sharing them in designated Discord channels.

## Features

- Monitor specific Threads users and automatically post their updates to Discord
- Filter posts based on keywords
- Exclude posts containing specific words (unless they match keywords)
- Support for multiple channel configurations
- Real-time updates from Threads to Discord

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Waikebber/Discord-Threads-Bot.git
cd Discord-Threads-Bot
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

4. Configure your bot settings in `config.json`:
```json
{
    "discord-text-channel": "channel-id-1",
    "user_posts": ["threads_username1", "threads_username2"],
    "keywords": ["keyword1", "keyword2"],
    "excluded": ["excluded_word1", "excluded_word2"]
}
```

You can add multiple configurations by adding more objects to the JSON array.

## Usage

1. Start the bot:
```bash
npm start
```
or 
```bash
node index.js
```

2. The bot will automatically:
   - Monitor the specified Threads users
   - Filter posts based on your keywords
   - Exclude posts containing excluded words (unless they match keywords)
   - Post matching content to the specified Discord channel

## Configuration

### Channel Configuration
- `discord-text-channel`: The ID of the Discord channel where posts will be shared
- `user_posts`: List of Threads usernames to monitor
- `keywords`: List of keywords that posts must contain to be shared
- `excluded`: List of words that will cause a post to be ignored (unless it contains a keyword)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Utilized Documentation:
### Meta Threads API
- [Retrieve and Discover Posts](https://developers.facebook.com/docs/threads/retrieve-and-discover-posts)
- [Retrieve User Posts](https://developers.facebook.com/docs/threads/retrieve-and-discover-posts/retrieve-posts)





