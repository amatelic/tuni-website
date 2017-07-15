import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';
import { Sound } from '../../lib/audio';
import { testing } from './projects/audio-testing';
import { TextTesting } from './projects/testing';
@Component({
    template: require('./example.html'),
})


export class ExampleComponent extends Vue {
  collection: any;

  data() {
    return {};
  }

  mounted() {
    // TextTesting();
    testing();
  }
}
