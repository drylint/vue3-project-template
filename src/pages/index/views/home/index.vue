<template>
  <view class="view-temp">
    <van-button type="primary">
      主要按钮
    </van-button>
    <van-button type="success">
      成功按钮
    </van-button>
    <div>
      <img :src="logo" alt="" srcset="">
    </div>
  </view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { reqHomeInfo } from '@/api'
import logo from '@/assets/logo.png'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import '@/utils/crypto'
export default defineComponent({
  data () {
    return {
      logo,
    }
  },
  created () {
    // ...
    // this.reqHomeInfo()
    this.handleFingerPrint()
  },
  methods: {
    // ...
    reqHomeInfo () {
      reqHomeInfo().then(data => {
        console.log(data)
      })
    },
    handleFingerPrint () {
      // Initialize an agent at application startup.
      const fpPromise = FingerprintJS.load();
      (async () => {
        // Get the visitor identifier when you need it.
        const fp = await fpPromise
        const result = await fp.get()

        // This is the visitor identifier:
        const { visitorId } = result
        console.log('FingerprintJS:', result, visitorId)
      })()
    },
  },
})
</script>

<style lang="scss" scoped>
.view-temp {
  font-size: inherit;
  img {
    max-height: 100%;
    max-width: 100%;
  }
}
</style>
