import { Event } from '../event-manager/event';

export class MessageCreate extends Event {
  public constructor() {
    super({ name: 'messageCreate' });
  }
  public async run(...args: any[]): Promise<void> {}
}
