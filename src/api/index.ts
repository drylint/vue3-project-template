import { REQ } from '@/utils/http_vant'

// // 获取商家信息列表
// export const GetShoplist = (data, isShowLoading = true) => REQ({
//   url: '/api/wechat/shoplist',
//   data,
// }, {
//   isShowLoading,
// })

// // 获取用户信息
// export const GetUserInfo = data => REQ({
//   url: '/api/wechat/getuserinfo',
//   data,
// })

// 获取首页信息
export const reqHomeInfo = (data = {}): Promise<unknown> => REQ({
  url: '/api/wechat/index',
  data,
})
