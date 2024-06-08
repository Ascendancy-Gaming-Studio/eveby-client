import { Client, ClientOptions } from 'discord.js';
import {
  ConfigManager,
  ConfigManagerInterface,
  ConfigMode,
  ConfigState,
} from '../features/config/config-manager';
import {
  EventManager,
  EventManagerInterface,
} from '../features/events/event-manager';


export interface EvebyInterface {
  load(): Promise<void>;
  run(): Promise<void>;
}

export class Eveby implements EvebyInterface {
  private config: ConfigManagerInterface;
  private eventManager: EventManagerInterface;
  private client: Client;

  public constructor(options: ClientOptions) {
    this.config = new ConfigManager({
      prefix: '#',
      mode: ConfigMode.Development,
      debug: true,
      state: ConfigState.NotReady,
    });

    this.client = new Client(options);

    this.eventManager = new EventManager({
      allowedEvents: ['ready', 'messageCreate'],
      config: this.config,
    });
  }

  public async load(): Promise<void> {
    await this.eventManager.load();
  }

  public async run(): Promise<void> {
    await this.eventManager.run();
  }
}
