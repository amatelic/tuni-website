import Vue from 'vue';
import Component from 'vue-class-component';
import  axios from 'axios';
import { PFileReader } from './File';

@Component({
    template: require('./import.html'),
})


export class ImportComponent extends Vue {

  getFile(e: HTMLInputElement) {
    const files = e.files
    const reader = new PFileReader(files[0], { type: 'CSV', header: true });
    reader.readFile()
      .then(data => {
        this.$emit('data', data);
      });
  }

}
