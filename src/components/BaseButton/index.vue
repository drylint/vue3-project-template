<template>
  <van-button
    v-bind="{
      ...$attrs,
    }"
  >
    <slot />
  </van-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  inheritAttrs: false,
  data () {
    return {
    }
  },
  created () {
    console.log(this.$attrs)
    // ...
  },
  methods: {
    // ...
  },
})
</script>

<style lang="scss" scoped>
.view-temp {
  font-size: inherit;
}
</style>
