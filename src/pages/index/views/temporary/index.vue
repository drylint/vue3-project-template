<template>
  <div class="view-temp">
    <div>{{ count }}</div>
    <div>{{ count1 }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  setup () {
    const obj = ref({
      count1: 0,
    })
    const count = ref(0)

    // setInterval(() => {
    //   count.value++
    //   obj.value.count++
    // }, 1000)
    return {
      count,
      obj,
    }
  },
})
</script>

<style lang="scss" scoped>
.view-temp {
  font-size: inherit;
}
</style>
