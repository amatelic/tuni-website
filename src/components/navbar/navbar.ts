import Vue from 'vue';
import Component from 'vue-class-component';
import  axios from 'axios';

@Component({
    template: require('./navbar.html')
})


export class NavbarComponent extends Vue {

  data() {
    return {
      list: [
        { name: 'Document', url: '/app/document'},
        { name: 'Example', url: '/app/examples'},
        { name: 'Pipeline', url: '/app/pipeline'}
      ]
    };
  }
}
