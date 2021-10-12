<template>
  <div class="view-form">
    <BaseForm />
  </div>
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
.view-form {
  background: #e5e5e5;
  font-size: inherit;
  min-height: 100vh;
  padding: 1em 0 0;
}
</style>
