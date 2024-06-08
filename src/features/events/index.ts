export declare type EventOptions = {
  name: string;
};

export interface EventInterface {
  name: string;

  run(...context: string[]): Promise<void>;
}
