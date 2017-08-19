import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';
import { testing, randomGenerator, randomByKeyboard } from './logic/audio-testing';
import { Sound, notes } from '../../../../lib/audio';
import { chunk, size } from 'lodash';
import Observer from '../../../../lib/Observer';
import KeyEvents from '../../../../lib/KeyEvent';

const keys = {
  a: 0, s: 1, d: 2, f: 3, g: 4, h: 5, j: 6, k: 7
};

const nn =  chunk(Object.keys(notes)
            .filter((d) => {
               return !d.match('#') && !(d === 'C8');
            })
            .sort()
            .map(key => ({
              name: key,
              value: notes[key]
            })), 8);

@Component({
    template: require('./sound-creator.html'),
    name: 'sound-creator',
    props: {}
})


export class SoundCreatorComponent extends Vue {
  notes: any;
  sound: Sound;
  index = 0;
  selectedIndex = 9999;
  records: Array<any>;
  observerRecords = new Observer();
  keyEvents = new KeyEvents();

  mounted () {
    this.index = 0;
    this.sound = new Sound();
    this.registerEvents();

  }
  data() {
    return {
      notes: notes,
      records: [],
    };
  }

  registerEvents() {
    this.observerRecords.add(this.addToRecord.bind(this));
    this.keyEvents.register('keydown', this.selectKey.bind(this));
    this.keyEvents.register('keydown', this.observerRecords.fire.bind(this.observerRecords));
    this.keyEvents.register('keyup', this.keyBoardInput.bind(this));
  }

  addToRecord() {
    if (this.selectedIndex && this.selectedIndex !== 9999) {
      console.log(this.selectedIndex);
      this.records.push(nn[this.index][this.selectedIndex]);
    }
  }

  selectKey(e) {
    const key = keys[e.key];
    this.selectedIndex = key;
  }

  keyBoardInput(e) {
    const size = nn.length - 1;
    const key = keys[e.key];
    this.selectedIndex = 9999;
    if (key || key === 0) {
      this.playSound(key);
    } else {
     if (e.key === 'ArrowUp' && size !== this.index) {
        this.index = this.index + 1;
     }

     if (e.key === 'ArrowDown' && this.index !== 0) {
      this.index = this.index - 1;
     }
    }
  }

  playSound(key) {
    const freq = nn[this.index][key].value;
    this.sound.start(freq);
    this.sound.stop();
  }

  useGenerated() {
    if (size(this.records)) {
      console.log('Fire generated notes');
      const notes = randomByKeyboard(this.records);
      console.log(getDistribution(notes));
      for (let i = 0; i < notes.length; i++) {
      setTimeout(_ => {
        this.sound.start(notes[i].note);
        this.sound.stop();
      }, i * 500);
    }
    } else {
      console.log('Records are empty');
    }
  }

  generate() {
    const notes = randomGenerator();
    console.log('Basic distibution');
    console.log(getDistribution(notes));
    console.log('**************');
    for (let i = 0; i < notes.length; i++) {
      setTimeout(_ => {
        this.sound.start(notes[i].note);
        this.sound.stop();
      }, i * 500);
    }
  }

  record() {
    this.observerRecords.toggle();
  }

  get playingNotes() {
    return nn[this.index];
  }

  play(note: number) {
    this.sound.start(note);
    this.sound.stop();
  }

  playIndex(index) {
    this.sound.start(this.playingNotes[index].value);
    this.sound.stop();
  }
}


function getDistribution(data: any[]) {
    return data.reduce((p, n) => {
      if (!p[n.note]) {
        p[n.note] =  0;
      }
      p[n.note]++;
      return p;
    }, {});
}
