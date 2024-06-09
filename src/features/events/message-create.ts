import { ClientEvents, Message } from 'discord.js';
import { Event } from '../event-manager/event';

export class MessageCreate extends Event {
  public constructor() {
    super({ name: 'messageCreate' });
  }

  public async run(client: ClientEvents, message: Message): Promise<void> {
    if (
      !message.content.startsWith(
        this.config?.localStorage.get('prefix')?.getValue(),
      )
    )
      return;

    if (message.content.slice(1) === 'ping') {
      message.reply('pong');
    }
  }
}
