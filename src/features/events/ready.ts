import { ActivityType } from 'discord.js';
import { Event } from '.';

export interface ReadyInterface {
  setActivity(): Promise<void>;
}

export class Ready extends Event implements ReadyInterface {
  public constructor() {
    super({ name: 'ready' });
  }

  public async setActivity(): Promise<void> {
    // TODO: Implementar a mudança de estado da atividade do bot.
    this.client?.user?.setActivity('!help', { type: ActivityType.Playing });
  }

  public async run(...args: any[]): Promise<void> {
    await this.setActivity();

    // TODO: Implementar o acesso global do estado do bot.
    console.log('Eveby is ready!');
  }
}
