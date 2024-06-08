export enum ListenerMode {
  OneShot = 'one-shot',
  Multiple = 'multiple',
}

export interface ObservableInterface {
  setValue(value: any): void;
  getValue(): any;
  addListener(observer: CallableFunction, oneShot?: ListenerMode): void;
  removeListener(observer: CallableFunction): void;
  notifyListeners(newValue?: any, oldValue?: any): void;
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
  private newValue: any;
  private oldValue: any;
  private observers: CallableFunction[] = [];
  private oneShot: number[] = [];

  public constructor(value: any) {
    this.setValue(value);
  }

  private setNewValue(value: any) {
    if (this.newValue === value) return;
    this.newValue = value;
  }

  private setOldValue(value: any) {
    if (this.oldValue === value) return;
    this.oldValue = value;
  }

  public setValue(value: any) {
    this.setOldValue(this.newValue);
    this.setNewValue(value);
    this.notifyListeners(this.newValue, this.oldValue);
  }

  public getValue() {
    return this.newValue;
  }

  public addListener(
    observer: any,
    oneShot: ListenerMode = ListenerMode.Multiple,
  ) {
    this.observers.push(observer);
    if (oneShot === ListenerMode.OneShot)
      this.oneShot.push(this.observers.length - 1);
  }

  public removeListener(observer: CallableFunction): void {
    this.observers = this.observers.filter(
      obs => obs instanceof observer !== true,
    );
  }

  public notifyListeners(newValue?: any, oldValue?: any): void {
    for (let i = this.observers.length - 1; i >= 0; i--) {
      this.observers[i](newValue, oldValue);

      if (this.oneShot.indexOf(i) !== -1) {
        this.observers.splice(i, 1);
        this.oneShot.splice(i, 1);
      }
    }
  }
}
