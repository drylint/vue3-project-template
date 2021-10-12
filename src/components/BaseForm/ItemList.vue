<template>
  <van-cell-group class="item-list">
    <template v-for="item in formItemList">
      <BaseField
        v-if="item.type && !NO_BASE_FIELD_TYPES.includes(item.type)"
        :key="`${item.prop}${item.uniqueKey}`"
        class="base-field"
        v-bind="{
          'disabled': formConfig.disabled,
          'class': {
            'line-break': formConfig.lineBreak || item.lineBreak,
            'devider': item.devider,
          },
          'border': item.devider ? false : formConfig.border,
        }"
        :[valueField(item)]="item.displayValue || formData[item.prop]"
        :item="item"
        @input="handleInput($event, item)"
        @focus="handleFocus(item)"
      />
      <!-- 递归渲染 BaseForm -->
      <!-- <div
        v-if="item.type && item.type === 'children'"
        :key="`${item.prop}${item.uniqueKey}`"
        class="base-form-children"
      >
        <BaseForm
          v-bind="item.config"
          :formInitData="formInitData[item.prop] || {}"
          @change="handleInput($event, item)"
        />
      </div> -->
    </template>
  </van-cell-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    formItemList: {
      required: true,
      type: Array,
    },
    formData: {
      type: Object,
      default: () => ({}),
    },
    formInitData: {
      type: Object,
      default: () => ({}),
    },
    formConfig: {
      type: Object,
      default: () => ({}),
    },
  },
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
