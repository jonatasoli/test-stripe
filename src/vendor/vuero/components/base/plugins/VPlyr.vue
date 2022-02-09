<script lang="ts">
// @ts-nocheck

import 'plyr/dist/plyr.css'
export default {
  name: 'VPlyr'
}
</script>

<script setup lang="ts">
// @ts-nocheck

import { onBeforeUnmount, onMounted, ref } from 'vue'
import Plyr from 'plyr'

export type VPlyrCaptions = {
  src: string
  srclang: string
  default?: boolean
}
export type VPlyrFormat = '4by3' | '16by9' | 'square'
export interface VPlyrProps {
  source: string
  title: string
  poster: string
  captions?: VPlyrCaptions[]
  reversed?: boolean
  embed?: boolean
  ratio?: VPlyrFormat
  options?: Plyr.Options.controls
}

const props = withDefaults(defineProps<VPlyrProps>(), {
  embed: false,
  poster: '',
  reversed: false,
  source: '',
  title: '',
  ratio: '16by9',
  options: () => ({
    controls: [
      'play-large',
      'play',
      'progress',
      'current-time',
      'mute',
      'volume',
      'captions',
      'settings',
      'pip',
      'airplay',
      'fullscreen'
    ]
  }),
  captions: () => []
})

const player = ref<Plyr>()
const videoElement = ref<HTMLElement>()

onMounted(() => {
  if (videoElement.value) {
    player.value = new Plyr(videoElement.value, props.options)
  }
})

onBeforeUnmount(() => {
  if (player.value) {
    player.value.destroy()
    player.value = undefined
  }
})
</script>

<template>
  <div class="video-player-container" :class="[ratio && 'is-' + ratio, reversed && 'reversed-play']">
    <!-- video element -->
    <iframe
      v-if="embed"
      :src="`${source}`"
      :title="props.title"
      allowfullscreen
      allowtransparency
      allow="autoplay"
    ></iframe>

    <video v-else ref="videoElement" controls playsinline :data-poster="poster">
      <source :src="source" type="video/mp4" />
      <track
        v-for="(caption, key) in props.captions"
        :key="key"
        :default="caption.default"
        kind="captions"
        :srclang="caption.srclang"
        :src="caption.src"
      />
    </video>
  </div>
</template>
