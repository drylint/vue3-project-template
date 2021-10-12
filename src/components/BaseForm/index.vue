<template>
  <van-form
    v-bind="{
      ...$attrs,
    }"
    @submit="handleSubmit"
  >
    <slot>
      <BaseField
        v-model="formData.username"
        label="姓名"
        required
        :rules="[{ required: true, message: '不能为空' }]"
      />

      <div style="margin: 16px;">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
        >
          提交
        </van-button>
      </div>
    </slot>
  </van-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseField from '@/components/BaseField/index.vue'
export default defineComponent({
  components: {
    BaseField,
  },
  inheritAttrs: false,
  props: {
    formConfig: {
      type: Object,
      default: () => ({}),
    },
    formProps: {
      type: Object,
      default: () => ({}),
    },
    formInitData: {
      type: Object,
      default: () => ({}),
    },
    buttonConfig: {
      type: Object,
      default: () => ({}),
    },
    formItemList: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      formData: {
        username: '',
      },
    }
  },
  created () {
    // ...
  },
  methods: {
    // ...
    handleSubmit () {
      console.log('submit', JSON.stringify(this.formData, null, 2))
    },
    handleConsole (slotProps: unknown) {
      console.log('slotProps', slotProps)
      return JSON.stringify(slotProps)
    },
  },
})
</script>

<style lang="scss" scoped>
.view-temp {
  font-size: inherit;
}
</style>
