import { Client } from 'discord.js';

export declare type EventOptions = {
  name: string;
};

export interface EventInterface {
  setClient(client: Client): void;
}

export class Event implements EventInterface {
  protected name: string;
  protected client?: Client;

  public constructor(options: EventOptions) {
    this.name = options.name;
  }

  public setClient(client: Client) {
    this.client = client;
  }
}
