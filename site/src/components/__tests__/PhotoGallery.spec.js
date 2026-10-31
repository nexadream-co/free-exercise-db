import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PhotoGallery from '../PhotoGallery.vue'

describe('PhotoGallery', () => {
  it('when passed an array of photos it should render properly', () => {
    const wrapper = mount(PhotoGallery, {
      props: {
        photos: ['3_4_Sit-Up/0.jpg']
      }
    })
    // it should render the image from the site's own exercises folder
    expect(wrapper.find('img').attributes('src')).toBe('/exercises/3_4_Sit-Up/0.jpg')
  })

  it('when passed an empty array it should render the local placeholder image', () => {
    const wrapper = mount(PhotoGallery, {
      props: {
        photos: []
      }
    })

    const img = wrapper.find('img')
    expect(img.attributes('src')).toContain('placeholder.svg')
    expect(img.attributes('alt')).toBe('No image available')
  })
})
