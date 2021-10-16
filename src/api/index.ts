import { REQ } from '@/utils/http_vant'

// 获取首页信息
export const reqHomeInfo = (data = {}): Promise<IApiHomeData> => REQ({
  url: '/api/wechat/index',
  data,
})
