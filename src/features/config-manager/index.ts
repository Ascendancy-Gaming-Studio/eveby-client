import { Collection } from 'discord.js';
import { Observable, ObservableInterface } from '../observables';
import { PathManager } from '../path-manager';

export enum ConfigMode {
  Development = 'development',
  Production = 'production',
}

export enum ConfigState {
  Ready = 'ready',
  NotReady = 'not-ready',
  Loading = 'loading',
  Running = 'running',
  Error = 'error',
}

export declare type ConfigManagerOptions = {
  prefix: string;
  mode: ConfigMode;
  debug: boolean;
  state: ConfigState;
};

export interface ConfigManagerInterface {
  localStorage: Collection<string, ObservableInterface>;

  setPrefix(prefix: string): void;
  setMode(mode: string): void;
  setDebug(debug: boolean): void;
  setState(state: ConfigState): void;
  setPathForEvents(path: string): void;
  setPathForCommands(path: string): void;
}

/**
 * Classe responsável pelo gerenciamento de configurações.
 * @class ConfigManager
 * @implements {ConfigManagerInterface}
 * @author [Julio Cesar](https://github.com/jcmljunior)
 * @version 0.0.1
 * @license MPL-2.0
 */
export class ConfigManager implements ConfigManagerInterface {
  localStorage: Collection<string, ObservableInterface>;

  private static instance: ConfigManager;

  public constructor(options: ConfigManagerOptions) {
    this.localStorage = new Collection();
    this.setDebug(options.debug);
    this.setMode(options.mode);
    this.setPrefix(options.prefix);
    this.setState(options.state);
    this.setPathForEvents(PathManager.getPathForEvents());
    this.setPathForCommands(PathManager.getPathForCommands());
  }

  public setPrefix(prefix: string) {
    if (this.localStorage.get('mode')?.getValue() === ConfigMode.Development)
      prefix = '!';
    this.localStorage.set('prefix', new Observable(prefix));
  }

  public setMode(mode: string) {
    this.localStorage.set('mode', new Observable(mode));
  }

  public setDebug(debug: boolean) {
    this.localStorage.set('debug', new Observable(debug));
  }

  public setState(state: ConfigState) {
    this.localStorage.set('state', new Observable(state));
  }

  public setPathForEvents(path: string) {
    this.localStorage.set('pathForEvents', new Observable(path));
  }

  public setPathForCommands(path: string) {
    this.localStorage.set('pathForCommands', new Observable(path));
  }

  public static of(instance: ConfigManagerInterface): ConfigManagerInterface {
    if (!ConfigManager.instance) {
      this.instance = instance;
    }

    return this.instance;
  }
}
