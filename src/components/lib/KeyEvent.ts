import Observer from './Observer';

export default class KeyEvents {
  private _onKeyDownfns: any[];
  private _onKeyUpfns: any[];
  private _isPressed: boolean;
  constructor() {
    this._onKeyDownfns = [];
    this._onKeyUpfns = [];
    this._isPressed = false;
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  onKeyDown(e) {
    if (!this._isPressed) {
      this._onKeyDownfns.forEach(fn => fn(e));
    }
    this._isPressed = true;
  }

  onKeyUp(e) {
    this._onKeyUpfns.forEach(fn => fn(e));
    this._isPressed = false;
  }

  register(type: string, fn: any) {
    if ( type === 'keydown') {
      this._onKeyDownfns.push(fn);
    } else {
      this._onKeyUpfns.push(fn);
    }
  }

  active() {
    console.log('Active', this._isPressed);
  }
}
