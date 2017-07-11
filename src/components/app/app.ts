import Vue from 'vue';
import Component from 'vue-class-component';
import { NavbarComponent } from '../navbar/navbar';
import  axios from 'axios';

@Component({
    template: require('./app.html'),
    components: {
      'Navbar': NavbarComponent,
    }
})


export class AppComponent extends Vue {
  mounted() {
  }

}
