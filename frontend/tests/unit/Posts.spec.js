import { mount } from '@vue/test-utils'
import Posts from '@/components/Posts.vue'

describe('Posts', () => {
    it('renders a div', () => {
      const wrapper = mount(Posts)
      expect(wrapper.contains('div')).toBe(true)
    })
  })

