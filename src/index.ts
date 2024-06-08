import { GatewayIntentBits } from 'discord.js';
import { Eveby } from './core/eveby';

const bot = new Eveby({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});
bot.load().then(() => bot.run());

/**
 * Experimento 1
 */
// import { ConfigManager } from './features/config/config-manager';
// import { EventManager } from './features/events/event-manager';
// import { PathManager } from './features/path-manager';

// var config = new ConfigManager({
//     mode: 'development',
//     debug: true,
//     prefix: '!',
// });

// config.localStorage
//     .get('prefix')
//     ?.subscribe(() => console.log('prefix changed...'));
// config.localStorage
//     .get('prefix')
//     ?.subscribe(() =>
//         console.log(
//             ConfigManager.of(config).localStorage.get('prefix')?.getValue(),
//         ),
//     );

// ConfigManager.of(config).localStorage.get('prefix')?.setValue('#');
// ConfigManager.of(config).localStorage.get('prefix')?.setValue('&');
// ConfigManager.of(config).localStorage.get('prefix')?.setValue('*');

/**
 * Experimento 2
 */
// var events = new EventManager({
//     allowedEvents: ['messageCreate', 'ready'],
// });

// events.load().then(() => events.run());

/**
 * Experimento 3
 */
// console.log(PathManager.getPath('commands', 'avatar', 'teste1', 'teste2'))
