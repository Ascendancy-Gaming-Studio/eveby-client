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
    this.client?.user?.setActivity('!help', { type: ActivityType.Playing });
  }

  public async run(...args: any[]): Promise<void> {
    await this.setActivity();

    if (!this.config?.localStorage.get('debug')?.getValue()) return;
    console.log('Eveby is ready!');
  }
}
