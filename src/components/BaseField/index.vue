<template>
  <van-field
    v-bind="{
      'placeholder': '请输入',
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
  </van-field>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  inheritAttrs: false,
})
</script>

<style lang="scss" scoped>
.view-temp {
  font-size: inherit;
}
</style>
