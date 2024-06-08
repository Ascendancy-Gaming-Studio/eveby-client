import { Client, ClientOptions } from 'discord.js';
import {
  ConfigManager,
  ConfigManagerInterface,
  ConfigMode,
  ConfigState,
} from '../features/config-manager';
import { EventManager, EventManagerInterface } from '../features/event-manager';

export interface EvebyInterface {
  load(): Promise<boolean>;
  run(state: boolean): Promise<boolean>;
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
      client: this.client,
    });
  }

  public setState(state: ConfigState) {
    this.config.localStorage.get('state')?.setValue(state);
  }

  public async login(state: boolean, token?: string): Promise<boolean> {
    if (!state) return false;

    if (!(await this.client.login(token))) return false;
    this.config.localStorage.get('state')?.setValue(ConfigState.Ready);

    return true;
  }

  public async load(): Promise<boolean> {
    this.setState(ConfigState.Loading);
    await setInterval(() => {}, 1000);
    await this.eventManager.load();

    return true;
  }

  public async run(state: boolean): Promise<boolean> {
    if (!state) {
      this.setState(ConfigState.NotReady);

      return false;
    }

    this.setState(ConfigState.Running);
    await setInterval(() => {}, 1000);
    await this.eventManager.run();

    return true;
  }
}
