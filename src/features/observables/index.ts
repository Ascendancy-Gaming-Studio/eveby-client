export interface ObservableInterface {
  value: any;
  observers: CallableFunction[];

  setValue(value: any): void;
  getValue(): any;
  subscribe(observer: CallableFunction): void;
  unsubscribe(observer: CallableFunction): void;
  notify(model: CallableFunction): void;
}

/**
 * A classe Observable implementa a ObservableInterface e fornece uma forma de gerenciar um valor e notificar os observadores inscritos quando o mesmo muda.
 * @class Observable
 * @implements {ObservableInterface}
 * @author [Julio Cesar](https://github.com/jcmljunior)
 * @version 0.0.1
 * @license MPL-2.0
 */
export class Observable implements ObservableInterface {
  public value: any;
  public observers: CallableFunction[];

  public constructor(value: any, observers: any[] = []) {
    this.value = value;
    this.observers = observers;
  }

  public setValue(value: any) {
    this.value = value;
    this.notify(this.value);
  }

  public getValue() {
    return this.value;
  }

  public subscribe(observer: CallableFunction): void {
    this.observers.push(observer);
  }

  public unsubscribe(observer: CallableFunction): void {
    this.observers = this.observers.filter(
      obs => obs instanceof observer !== true,
    );
  }

  public notify(model: CallableFunction): void {
    this.observers.forEach((obs: CallableFunction) => obs(model));
  }
}
