<template>
  <div class="view-login">
    <van-form @submit="onSubmit">
      <van-field
        v-model="formData.account"
        name="帐号"
        label="帐号"
        placeholder="请输入"
      />
      <van-field
        v-model="formData.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入"
      />
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { reqLogin, reqLoginJWT } from '@/api/user'

export default defineComponent({
  data () {
    return {
      formData: {
        account: '',
        password: '',
      },
    }
  },
  created () {
    // ...
  },
  methods: {
    // ...
    onSubmit () {
      const { formData, formData: { account, password } } = this
      if (!account || !password) {
        this.$toast('请输入')
        return
      }

      reqLogin(formData).then(data => {
        console.log(data)
      })

      reqLoginJWT(formData).then(data => {
        console.log(data)
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.view-login {
  font-size: inherit;
}
</style>
