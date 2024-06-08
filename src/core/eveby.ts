import { Client, ClientOptions } from 'discord.js';
import { config } from 'dotenv';
import {
  ConfigManager,
  ConfigManagerInterface,
  ConfigMode,
  ConfigState,
} from '../features/config-manager';
import { EventManager, EventManagerInterface } from '../features/event-manager';
import { ListenerMode } from '../features/observables';

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

    this.config.localStorage.get('state')?.addListener(async () => {
      if (
        this.config.localStorage.get('state')?.getValue() == ConfigState.Ready
      ) {
        config({
          path: './environments/.env.development',
        });

        await this.login(process.env.DISCORD_ACCESS_TOKEN);
      }
    });

    this.config.localStorage
      .get('state')
      ?.addListener((newValue: ConfigState, oldValue: ConfigState) => {
        console.log(
          'O estado foi modificado de %s para %s'
            .replace('%s', oldValue.toString())
            .replace('%s', newValue.toString()),
        );
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
