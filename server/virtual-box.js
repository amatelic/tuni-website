const util = require('util');
const vm = require('vm');
const EventEmitter = require('events');

class VirtualBox extends EventEmitter {

  constructor(property = {}) {
    super();
    this.index = 0;
    this.property = property
    this.context = new vm.createContext(this.property);
    this.queue = [];
  }

  addContainer(code = '') {
    const script = new vm.Script(code);
    this.queue.push(script);
  }

  removeContainer() {

  }

  runAll() {
    this.queue.forEach((script, index) => {
      try {
        script.runInContext(this.context);
        this.emit('data', this.property);
      } catch (e) {
        this.emit('error', {
          row: index,
          message: e.message
        });
      }

    });

    return this.property;

  }
}

module.exports = VirtualBox;
