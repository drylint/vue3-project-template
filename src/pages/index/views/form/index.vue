<template>
  <BaseForm />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseForm from '@/components/BaseForm/index.vue'
export default defineComponent({
  components: {
    BaseForm,
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
