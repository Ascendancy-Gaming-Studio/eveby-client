import { Client, Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { Observable, ObservableInterface } from '../observables';
import { PathManager } from '../path-manager';
import { ConfigManagerInterface } from '../config-manager';

export declare type EventOptions = {
  allowedEvents: string[];
  config: ConfigManagerInterface;
  client: Client;
};

export interface EventManagerInterface {
  load(): Promise<void>;
  run(): Promise<void>;
}

/**
 * A classe implementa EventManagerInterface e é responsavel pelo carregamento e execução dos eventos.
 * @class EventManager
 * @implements {EventManagerInterface}
 * @author [Julio Cesar](https://github.com/jcmljunior)
 * @version 0.0.1
 * @license MPL-2.0
 */
export class EventManager implements EventManagerInterface {
  private localStorage: Collection<string, ObservableInterface>;
  private allowedEvents: string[] = [];
  private config: ConfigManagerInterface;
  private client: Client;

  public constructor(options: EventOptions) {
    this.localStorage = new Collection();
    this.config = options.config;
    this.client = options.client;

    this.setAllowedEvents(options.allowedEvents);
  }

  public setAllowedEvents(allowedEvents: string[]) {
    allowedEvents.forEach((event) => {
      this.allowedEvents.push(this.convertEventNameToFileName(event));
    });
  }

  public convertEventNameToFileName(event: string) {
    return event
      .toString()
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase();
  }

  public convertFileNameToEventName(fileName: string) {
    return fileName
      .toString()
      .replace('.js', '')
      .replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  }

  public convertFileNameToClassName(fileName: string) {
    return fileName.charAt(0).toUpperCase().concat(fileName.slice(1));
  }

  public async load() {
    const files = readdirSync(PathManager.getPathForEvents(), {
      withFileTypes: false,
    });

    this.localStorage.set('events', new Observable([]));

    files.forEach((file) => {
      if (!this.allowedEvents.includes(file.toString().replace('.js', '')))
        return;

      this.localStorage
        .get('events')
        ?.getValue()
        .push(this.convertFileNameToEventName(file.toString()));

      if (!this.config.localStorage.get('debug')?.getValue()) return;
      console.log(
        '[Carregando Evento]: ',
        this.convertFileNameToEventName(file.toString()),
      );
    });
  }

  public async run(): Promise<void> {
    this.localStorage
      .get('events')
      ?.getValue()
      .forEach((event: string) => {
        const eventPath = PathManager.getPath(
          'events',
          this.convertEventNameToFileName(event + '.js'),
        );
        const eventName = this.convertFileNameToClassName(event);
        var obj = require(eventPath);

        obj = new obj[eventName]();
        obj.setConfig(this.config);
        obj.setClient(this.client);

        this.client.on(event, (...args) => obj.run(this.client, ...args));

        if (!this.config.localStorage.get('debug')?.getValue()) return;
        console.log(
          '[Executando Evento]: ',
          this.convertFileNameToEventName(event.toString()),
        );
      });
  }
}
