import { GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import { Eveby } from './core/eveby';

const bot = new Eveby({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

bot
  .load()
  .then((state: boolean) => bot.run(state))
  .then((state: boolean) => {
    config({
      path: './environments/.env.development',
    });

    bot.login(state, process.env.DISCORD_ACCESS_TOKEN);
  });
