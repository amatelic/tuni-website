export default class Observer {
  _callbacks: any[];
  _toggle: boolean;

  constructor() {
    this._callbacks = [];
    this._toggle = false;
  }

  start() {
    this._toggle = true;
  }

  stop() {
    this._toggle = false;
  }

  toggle() {
    this._toggle = !this._toggle;
  }


  add(callback: any) {
    this._callbacks.push(callback);
  }

  fire() {

    if (this._toggle) {
      this._callbacks.forEach(callback => {
        callback();
      });
    }
  }

  destroy() {

  }

}
