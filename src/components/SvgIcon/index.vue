<template>
  <div
    v-if="isExternalIcon"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    :class="className"
  ></div>
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { isExternal } from '@/utils/validate'
import { computed, defineProps } from 'vue'
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  className: {
    type: String,
    default: ''
  }
})
const isExternalIcon = computed(() => {
  return isExternal(props.icon)
})

const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))
const iconName = computed(() => `#icon-${props.icon}`)
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
