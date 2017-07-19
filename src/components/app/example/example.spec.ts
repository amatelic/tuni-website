import { expect } from 'chai';
import { ExampleComponent } from './example';
import { ComponentTest } from '../../../util/component-test';

describe('Home component', () => {
  let directiveTest: ComponentTest;

  beforeEach(() => {
    directiveTest = new ComponentTest('<div><home></home></div>', { 'home': ExampleComponent });
  });

  it('should render correct contents', async () => {
    directiveTest.createComponent();
    await directiveTest.execute((vm) => {
      debugger;
      const mode = process.env.ENV;
      expect(vm.$el.querySelector('.mode').textContent).to.equal(`${mode} mode`);
      expect(vm.$el.querySelector('.package').textContent).to.equal('vue-webpack-typescript');
    });
  });
});