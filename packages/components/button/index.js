import Button from './src/button.vue'
import { withInstall } from '@test-ui/utils';

Button.install = (app) => {
  app.component(Button.name, Button);
}
export const TButton = Button

export default TButton



// export const TButton = withInstall(Button)

// export default TButton