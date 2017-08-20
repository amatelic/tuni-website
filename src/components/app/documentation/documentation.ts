import Vue from 'vue';
import Component from 'vue-class-component';
import  axios from 'axios';
import { AddDocumentComponent } from './add/add';
import { ListDocumentComponent } from './list/list';
import { IMessage } from './doceument-interface';

const URL = 'http://localhost:4444/wm';

@Component({
    template: require('./documentation.html'),
    components: {
      'add-document': AddDocumentComponent,
      'item-document': ListDocumentComponent
    }
})


export class DocumentationComponent extends Vue {
  items: any;

  mounted() {
    axios.get(`${URL}/1/`)
      .then(data => console.log('Data', data))
      .catch(err => console.log('Err', err));
  }

  data() {
    return {
      items: []
    };
  }

  add(data: IMessage) {
    axios.get(`${URL}/1/add?code=${data.message}`)
    .then(_ => {
      console.log('Data', data);
      this.items.push(data);
    })
    .catch(err => console.log('Err', err));
  }
}
