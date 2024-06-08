import { EventInterface } from '.';

export interface ReadyInterface {
  setActivity(): Promise<void>;
}

export class Ready implements EventInterface, ReadyInterface {
  public name: string;

  public constructor() {
    this.name = 'ready';
  }

  public async setActivity(): Promise<void> {
    // TODO: Implementar a mudança de estado da atividade do bot.
  }

  public async run(...args: any[]): Promise<void> {
    await this.setActivity();

    // TODO: Implementar o acesso global do estado do bot.
    console.log('Eveby is ready!');
  }
}
