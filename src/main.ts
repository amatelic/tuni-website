import * as Vue from 'vue';
import VueRouter from 'vue-router';

import { IntroComponent } from './components/intro/intro';
import { AppComponent } from './components/app/app';
import { PipelineComponent } from './components/app/pipeline/pipeline';
import { ExampleComponent } from './components/app/example/example';
import { SoundCreatorComponent } from './components/app/example/projects/sound-creator/sound-creator';

// register the plugin
Vue.use(VueRouter);

let router = new VueRouter({
  routes: [
    { path: '/', component: IntroComponent },
    {
      path: '/app',
      component: AppComponent,
      children: [
        { path: '/app/examples', component: ExampleComponent },
        { path: '/app/pipeline', component: PipelineComponent }
      ]
    },
  ]
});

new Vue({
  el: '#app',
  router: router,
});


Vue.component('sound-creator', SoundCreatorComponent);

