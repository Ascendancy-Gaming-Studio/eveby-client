import { Client, ClientOptions } from 'discord.js';
import {
  ConfigManager,
  ConfigManagerInterface,
  ConfigMode,
  ConfigState,
} from '../features/config-manager';
import { EventManager, EventManagerInterface } from '../features/event-manager';
import { config } from 'dotenv';

export interface EvebyInterface {
  setState(state: ConfigState): void;
  load(): Promise<boolean>;
  run(state: boolean): Promise<void>;
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

    // TODO: Implementar o disparo unico de eventos.
    this.config.localStorage
      .get('state')
      ?.subscribe(() => console.log('state changed'));
    this.config.localStorage.get('state')?.subscribe(async () => {
      if (
        this.config.localStorage.get('state')?.getValue() == ConfigState.Ready
      ) {
        config({
          path: './environments/.env.development',
        });

        await this.login(process.env.DISCORD_ACCESS_TOKEN);
      }
    });
  }

  public setState(state: ConfigState): void {
    this.config.localStorage.get('state')?.setValue(state);
  }

  private async login(token?: string): Promise<void> {
    this.client.login(token);
  }

  public async load(): Promise<boolean> {
    this.setState(ConfigState.Loading);
    await setInterval(() => {}, 1000);
    await this.eventManager.load();

    return true;
  }

  public async run(state: boolean): Promise<void> {
    if (!state) {
      this.setState(ConfigState.NotReady);
      return;
    }

    this.setState(ConfigState.Running);
    await setInterval(() => {}, 1000);
    await this.eventManager.run();

    this.setState(ConfigState.Ready);
  }
}
