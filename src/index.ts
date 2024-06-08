import { GatewayIntentBits } from 'discord.js';
import { Eveby } from './core/eveby';

const bot = new Eveby({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

bot.load().then((state: boolean) => bot.run(state));
