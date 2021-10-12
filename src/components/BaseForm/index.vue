<template>
  <van-form
    class="use-van-form"
    v-bind="{
      ...$attrs,
    }"
    @submit.prevent="handleSubmit"
  >
    <slot>
      <van-cell-group>
        <BaseField
          v-model="formData.username"
          label="姓名"
          required
          :rules="[{ required: true, message: '不能为空' }]"
        />
        <BaseField
          label="是否选中"
        >
          <template #input>
            <BaseSwitch v-model="formData.isTrue" />
          </template>
        </BaseField>
      </van-cell-group>
      <div class="btn-box">
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
import BaseSwitch from '@/components/BaseSwitch/index.vue'
export default defineComponent({
  components: {
    BaseField,
    BaseSwitch,
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
        isTrue: false,
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
.use-van-form {
  background-color: #fff;
  font-size: inherit;
  .btn-box {
    padding: 2em var(--van-cell-horizontal-padding, 16px);
  }
}
</style>
