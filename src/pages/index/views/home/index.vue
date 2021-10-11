<template>
  <div class="view-temp">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, Ref } from 'vue'
import { reqUserList } from '@/api/user'
// import testJpg from '@/assets/test.jpg'
// import logo from '@/assets/logo.png'
export default defineComponent({
  setup () {
    const homeData: Ref<IApiHomeData> = ref({})
    const reqHomeData = async () => {
      const data = await reqUserList()
      console.log(data)
    }
    onMounted(reqHomeData)
    return {
      homeData,
      reqHomeData,
    }
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
  .my-swipe {
    background-color: #aaa;
    height: 210px;
    width: 100%;
  }
}
</style>
