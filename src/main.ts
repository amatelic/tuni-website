import * as Vue from 'vue';
import VueRouter from 'vue-router';
import VuePrism from 'vue-prism';

import { IntroComponent } from './components/intro/intro';
import { AppComponent } from './components/app/app';
import { PipelineComponent } from './components/app/pipeline/pipeline';
import { DocumentationComponent } from './components/app/documentation/documentation';
import { Vector } from './helpers/math';

// register the plugin
Vue.use(VueRouter);
Vue.use(VuePrism);

let router = new VueRouter({
  routes: [
    { path: '/', component: IntroComponent },
    {
      path: '/app',
      component: AppComponent,
      children: [
        { path: '/app/pipeline', component: PipelineComponent },
        { path: '/app/document', component:  DocumentationComponent }
      ]
    },
  ]
});

new Vue({
  el: '#app',
  router: router,
});


const vec = new Vector([1, 2, 3]);
console.log(vec.size);
console.log(vec.get(1))

