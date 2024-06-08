import { EventInterface } from '.';

export class MessageCreate implements EventInterface {
  public name: string;

  public constructor() {
    this.name = 'messageCreate';
  }

  public async run(...args: any[]): Promise<void> {}
}
