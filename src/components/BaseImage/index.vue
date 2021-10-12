<template>
  <van-image
    v-bind="{
      ...$attrs,
    }"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
    }
  },
  created () {
    // ...
    console.log(process.env.TZ)
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
