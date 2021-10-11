import Axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosPromise,
} from 'axios'
import { removeSession, getSession } from '@/utils/storage'
import { Toast } from 'vant'
import { ComponentInstance } from 'vant/es/utils'

const { VUE_APP_BASE_URL, NODE_ENV } = process.env

// 允许多个 Toast 实例
Toast.allowMultiple()
Toast.setDefaultOptions({
  forbidClick: true,
  // duration: 0
  // mask: true,
})

// 创建 axios 实例，传入实例配置
const axios = Axios.create({
  baseURL: NODE_ENV === 'production' ? VUE_APP_BASE_URL : '',
  withCredentials: false,
})

// 请求拦截函数，接收配置对象为参数，用于拦截请求配置，可做出修改
const reqFn = (config: AxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${getSession('token')}`
  return config
}

// 响应拦截函数，接收响应对象为参数，用于根据响应结果做出相应操作
// 响应成功(status === 2xx)时会被调用
const resFn = (res: AxiosResponse) => {
  const { code, success, status, msg, message, isShowMsg } = res.data
  // 如果 code/success/status/... 均不存在，表示不需要判断内部状态码，直接放行
  if ([code, success, status].every(v => v === undefined)) {
    return res
  }
  // const isSuccess = code >= 200 && code < 300
  const isSuccess = code === 1
  // 请求成功
  if (isSuccess) {
    if (isShowMsg && (msg || message)) {
      Toast.success({
        message: msg || message,
        duration: 2000,
      })
    }
    return res
  }
  if (code === 401) {
    removeSession('token')
  }
  // 请求失败的情况
  if (msg || message) {
    Toast.fail({
      message: msg || message,
      duration: 2000,
    })
  }
  return Promise.reject(res)
}

// 请求/响应 错误的函数（status 非 2xx 时）
const errorFn = (msg = '') => (error: AxiosError) => {
  // error.response 对象：config, data, headers, request, status, statusText
  if (error.response) {
    const { status, statusText } = error.response
    const errorInfo = `${statusText}\n${status}`
    Toast.fail({
      message: status ? errorInfo : msg,
      duration: 2000,
    })
  } else {
    Toast.fail({
      message: '响应超时',
      duration: 2000,
    })
  }
  return Promise.reject(error)
}

// 请求、响应拦截器
axios.interceptors.request.use(reqFn, errorFn('请求出错，请稍后重试'))
axios.interceptors.response.use(resFn, errorFn('响应出错，请稍后重试'))

// 请求方法
const REQ = ({
  method = 'POST',
  url = '',
  data = {},
  timeout = 40 * 1000,
}: AxiosRequestConfig = {}, {
  isShowLoading = true,
} = {}): AxiosPromise => {
  let loading: ComponentInstance | null = null
  isShowLoading && (loading = Toast.loading({}))
  return new Promise((resolve, reject) => {
    axios({
      method,
      url,
      [method.toUpperCase() === 'POST' ? 'data' : 'params']: data,
      timeout,
    }).then(res => {
      resolve(res?.data?.data || res?.data)
    }).catch(err => {
      reject(err)
    }).finally(() => {
      loading && loading.clear()
    })
  })
}

export {
  REQ,
}

export default REQ
