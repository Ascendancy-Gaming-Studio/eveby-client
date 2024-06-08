import path from 'path';

/**
 * Classe responsável pelo gerenciamento de caminhos.
 * @class PathManager
 * @implements {PathManagerInterface}
 * @author [Julio Cesar](https://github.com/jcmljunior)
 * @version 0.0.1
 * @license MPL-2.0
 */
export class PathManager {
  public static getPathForEvents(): string {
    return path.join(__dirname, '..', 'events');
  }

  public static getPathForCommands(): string {
    return path.join(__dirname, '..', 'commands');
  }

  public static getPath(...args: string[]): string {
    return path.join(__dirname, '..', args.toString().replace(/,/g, path.sep));
  }
}
