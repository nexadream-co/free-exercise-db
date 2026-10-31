<script>
import { ArrowPathIcon } from '@heroicons/vue/24/solid'
import placeholderUrl from '@/assets/placeholder.svg'

// images are served from this site's own /exercises folder
// (site/public/exercises is a symlink to the repo's exercises directory)
// override with VITE_IMAGE_BASE_URL to use a CDN or other host
const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL || `${import.meta.env.BASE_URL}exercises/`

export default {
  components: {
    ArrowPathIcon
  },
  props: {
    photos: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentIndex: 0,
      loading: false,
      placeholderUrl
    }
  },
  computed: {
    hasPhotos() {
      return this.photos.length > 0
    },
    currentPhoto() {
      return this.photos[this.currentIndex]
    },
    currentPhotoUrl() {
      return `${imageBaseUrl}${this.currentPhoto}`
    }
  },
  methods: {
    nextPhoto(event) {
      event.preventDefault()
      if (!this.hasPhotos) {
        return
      }

      this.loading = true

      // cycle through the photos array
      if (this.currentIndex === this.photos.length - 1) {
        this.currentIndex = 0
      } else {
        this.currentIndex++
      }
    },
    onImageLoad() {
      // remove the blur once the next image has finished loading
      this.loading = false
    }
  }
}
</script>
<template>
  <div v-if="hasPhotos" :class="{ loading: loading }" class="relative">
    <a href="#" @click="nextPhoto">
      <img
        :src="currentPhotoUrl"
        loading="lazy"
        class="w-full object-cover rounded-t-lg p-2"
        @load="onImageLoad"
      />
    </a>
    <ArrowPathIcon class="w-4 h-3 absolute top-4 left-4 text-white text-sm opacity-80" />
  </div>
  <img
    v-else
    :src="placeholderUrl"
    alt="No image available"
    class="w-full object-cover rounded-t-lg p-2"
  />
</template>
<style scoped>
.loading img {
  filter: blur(2px);
}
</style>
