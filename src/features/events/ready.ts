import { ActivityType } from 'discord.js';
import { Event } from '../event-manager/event';

export class Ready extends Event {
  public constructor() {
    super({ name: 'ready' });
  }

  private async setActivity(): Promise<void> {
    this.client?.user?.setActivity(this.config?.localStorage.get('prefix')?.getValue() + 'help', { type: ActivityType.Playing });
  }

  public async run(...args: any[]): Promise<void> {
    await this.setActivity();

    if (!this.config?.localStorage.get('debug')?.getValue()) return;
    console.log('Eveby is ready!');
  }
}
