import { Event } from '.';

export class MessageCreate extends Event {
  public constructor() {
    super({ name: 'messageCreate' });
  }
  public async run(...args: any[]): Promise<void> { }
}
