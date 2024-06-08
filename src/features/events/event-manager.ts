import { Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { Observable, ObservableInterface } from '../observables';
import { PathManager } from '../path-manager';
import { ConfigManagerInterface } from '../config/config-manager';

export declare type EventOptions = {
  allowedEvents: string[];
  config: ConfigManagerInterface;
};

export interface EventManagerInterface {
  // getEvents(): string[];
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
  // private events: string[] = [];
  private config: ConfigManagerInterface;

  public constructor(options: EventOptions) {
    this.localStorage = new Collection();
    this.config = options.config;

    this.setAllowedEvents(options.allowedEvents);
  }

  public setAllowedEvents(allowedEvents: string[]) {
    allowedEvents.forEach(event => {
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
      .replace(/-([a-z])/g, g => g[1].toUpperCase());
  }

  public convertFileNameToClassName(fileName: string) {
    return fileName.charAt(0).toUpperCase().concat(fileName.slice(1));
  }

  // public getEvents() {
  //   return this.events;
  // }

  public async load() {
    const files = readdirSync(PathManager.getPathForEvents(), {
      withFileTypes: false,
    });

    this.localStorage.set('events', new Observable([]));

    files.forEach(file => {
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
    var obj: any;

    this.localStorage
      .get('events')
      ?.getValue()
      .forEach((event: any) => {
        obj = require(
          PathManager.getPath(
            'events',
            this.convertEventNameToFileName(event.toString() + '.js'),
          ),
        );
        obj = new obj[this.convertFileNameToClassName(event.toString())]();
        // this.events.push(obj);

        if (!this.config.localStorage.get('debug')?.getValue()) return;
        console.log(
          '[Executando Evento]: ',
          this.convertFileNameToEventName(event.toString()),
        );
      });
  }
}
