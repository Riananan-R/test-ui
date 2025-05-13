import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button', () => {
  it('renders text', () => {
    const wrapper = mount(Button, {
      slots: { default: 'Click Me' }
    })
    expect(wrapper.text()).toBe('Click Me')
  })
})


