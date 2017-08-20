import Vue from 'vue';
import Component from 'vue-class-component';
import  axios from 'axios';
import { IMessage } from '../doceument-interface';

const URL = 'http://localhost:4444/wm';

@Component({
    template: require('./list.html'),
    props: ['data']
})


export class ListDocumentComponent extends Vue {
  data: IMessage;

  run() {
    axios.get(`${URL}/1/run`)
      .then(data => console.log('Data', data))
      .catch(err => console.log('Err', err));
  }
}
