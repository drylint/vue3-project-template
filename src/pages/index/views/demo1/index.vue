<template>
  <div class="view-temp">
    <BaseButton
      v-pin:bottom="'3em'"
      v-pin:right="'1em'"
      type="primary"
      @click="handleClick"
    >
      按钮组件
    </BaseButton>
    <br>
    <BaseImage v-hide="1" :src="require('@/assets/test.jpg')" />
    <br>
    <van-field
      v-model="inputValue"
      v-focus
      label="文本"
      placeholder="请输入"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseButton from '@/components/BaseButton/index.vue'
import BaseImage from '@/components/BaseImage/index.vue'

export default defineComponent({
  components: {
    BaseButton,
    BaseImage,
  },
  data () {
    return {
      inputValue: '',
      direction: { a: 1 },
    }
  },
  created () {
    // ...
  },
  methods: {
    // ...
    handleClick () {
      console.log('Click')
    },
  },
})
</script>

<style lang="scss" scoped>
.view-temp {
  font-size: inherit;
}
</style>
