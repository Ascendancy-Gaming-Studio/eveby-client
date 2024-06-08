import { Client } from 'discord.js';
import { ConfigManager } from '../config-manager';

export declare type EventOptions = {
  name: string;
};

export interface EventInterface {
  setClient(client: Client): void;
}

export abstract class Event implements EventInterface {
  protected name: string;
  protected config?: ConfigManager;
  protected client?: Client;

  public constructor(options: EventOptions) {
    this.name = options.name;
  }

  public setClient(client: Client) {
    this.client = client;
  }

  public setConfig(config: ConfigManager) {
    this.config = config;
  }
}
