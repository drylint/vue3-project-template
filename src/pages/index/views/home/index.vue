<template>
  <div class="view-temp">
    <van-swipe
      class="my-swipe"
      :autoplay="5000"
      indicator-color="white"
    >
      <van-swipe-item
        v-for="item in homeData.bannerlist"
        :key="item.id"
      >
        <BaseImage :src="item.banner" />
      </van-swipe-item>
    </van-swipe>
    <BaseButton @click="handleClick">点击</BaseButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { reqHomeInfo } from '@/api/index'
import BaseButton from '@/components/BaseButton/index.vue'
import BaseImage from '@/components/BaseImage/index.vue'
// import testJpg from '@/assets/test.jpg'
// import logo from '@/assets/logo.png'
export default defineComponent({
  components: {
    BaseButton,
    BaseImage,
  },
  props: {
    propName: {
      type: String,
      default: '',
    },
  },
  setup (props) {
    console.log(props)
    const homeData: any = ref({})
    const reqHomeData = async () => {
      const data = await reqHomeInfo()
      homeData.value = data
    }
    onMounted(() => {
      console.log('onMounted')
      reqHomeData()
    })
    const handleClick = () => {
      console.log(homeData)
    }
    return {
      homeData,
      reqHomeData,
      handleClick,
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
    height: 50px;
    width: 100%;
  }
}
</style>
