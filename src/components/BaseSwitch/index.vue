<template>
  <van-switch
    v-bind="{
      ...$attrs,
    }"
  >
    <!-- slot 透传 -->
    <template
      v-for="slotName in Object.keys($slots)"
      #[slotName]="slotProps"
    >
      <slot :name="slotName" v-bind="slotProps || {}" />
    </template>
  </van-switch>
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
