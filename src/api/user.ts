import { REQ } from '@/utils/http_vant'

// 获取首页信息
export const reqUserList = (data = {}): Promise<IApiHomeData> => REQ({
  url: '/api/users',
  data,
  method: 'GET',
}) as unknown as Promise<IApiHomeData>

// 获取首页信息
export const reqLogin = (data = {}): Promise<IApiHomeData> => REQ({
  url: '/api/loginSession',
  data,
  method: 'POST',
}) as unknown as Promise<IApiHomeData>

// 获取首页信息
export const reqLoginJWT = (data = {}): Promise<IApiHomeData> => REQ({
  url: '/api/loginJWT',
  data,
  method: 'POST',
}) as unknown as Promise<IApiHomeData>
