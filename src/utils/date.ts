/**
 * 将字符串、数字转为 Date 类型，Date 类型直接返回
 * @param val 要转换为 Date 的值
 * @returns 返回转换后的 Date
 */
export const parseToDate = (val: string | number | Date): Date => {
  if (typeof val === 'number') {
    if (/^\d{1,12}$/u.test(String(val))) {
      val *= 1000
    }
    return new Date(val)
  }
  if (typeof val === 'string') {
    return new Date(val.replace(/-/gu, '/').replace(/T/gu, ' ').replace(/\..*/gu, ''))
  }
  return val
}

/**
 * 格式化一个日期，YYYY, MM, DD, hh, mm, ss, w 以外的字符将保留
 *
 * @param val 要格式化的日期
 * @param format 需要格式化的格式，`YYYY` 年，2 或 4 位，`MM，DD，hh，mm，ss` 分别 1 或 2 位，w 为 1 位
 * @returns 返回转换后的字符串
 * @example
 * dateToString(new Date(), 'YYYY-MM-DD hh:mm:ss') // 2020-07-09 17:11:09
 * dateToString(new Date(), 'YY-M-D h:m:s') // 20-7-9 17:11:9
 * dateToString(new Date(), 'YYYY年MM月DD日 hh时mm分ss秒 星期w') // 2020年07月09日 17时11分09秒 星期四
 * dateToString(new Date(), 'YY年M月D日 h时m分s秒') // 20年7月9日 17时11分9秒
 * dateToString(new Date(), '星期w') // 星期四
 */
export const dateToString = (
  val: string | number | Date = new Date(),
  format: 'date' | 'time' | string = 'YYYY-MM-DD hh:mm:ss',
): string => {
  const date = parseToDate(val)
  if (Number.isNaN(+date)) {
    return ''
  }
  if (format === 'date') {
    format = 'YYYY-MM-DD'
  } else if (format === 'time') {
    format = 'hh:mm:ss'
  }
  // 替换 年 的占位符 YYYY
  format = format.replace(/YY(YY)?/u, match => {
    const Y = `${date.getFullYear()}`
    return match && match.length >= 4 ? Y : Y.slice(2)
  })
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  // 替换 月日时分秒 的占位符
  const obj = {
    '(MM?)': date.getMonth() + 1,
    '(DD?)': date.getDate(),
    '(hh?)': date.getHours(),
    '(mm?)': date.getMinutes(),
    '(ss?)': date.getSeconds(),
    '(w)': weekdays[date.getDay()],
  }
  Object.entries(obj).forEach(([key, value]) => {
    const v = String(value)
    format = format.replace(new RegExp(key, 'u'), (match: string) => {
      const result = match && match.length >= 2 ? value >= 10 ? v : `0${v}` : v
      return result
    })
  })
  return format
}

// 获取某个日期属于第几个季度
export const seasonParse = (val: string | number | Date): string => {
  const date = parseToDate(val)
  if (Number.isNaN(+date)) {
    return ''
  }
  const season = `${Math.floor((date.getMonth() + 3) / 3)}`
  return season
}

// 判断一个时间是多久之前 比如：'刚刚', '5分钟前'
export const howLongAgo = (val: string | number | Date): string => {
  const date = parseToDate(val)
  if (Number.isNaN(+date)) {
    return ''
  }
  const now = Date.now()
  const diff = (now - +date) / 1000

  if (diff < 60) {
    return '刚刚'
  }
  if (diff < 60 * 60) {
    return `${Math.floor(diff / 60)}分钟前`
  }
  if (diff < 60 * 60 * 24) {
    return `${Math.floor(diff / 60 / 60)}小时前`
  }
  if (diff > 60 * 60 * 24 * 1) {
    return `${Math.floor(diff / 60 / 60 / 24)}天前`
  }
  return ''
}

/**
 * 获取未来或过去的某一天，可选获取那一天的开始，结束，默认为获取当时。可选时间戳。
 * @param count 未来多少天(正整数)，过去多少天(负整数)
 * @param startOrEnd 目标日的开始或结束，默认为当时
 * @param format 返回数据格式
 * @returns 返回日期对象或时间戳
 * @example
 * getSomeDay(7, undefined, true)
 */
export const getSomeDay = (
  count: number,
  startOrEnd: 'start' | 'end' | undefined = undefined,
  format: 'timestamp' | 'date' | 'string' = 'date',
): string | number | Date => {
  if (typeof count !== 'number') {
    return ''
  }
  const now = Date.now()
  const targetDayTimestamp = now + (count * 1000 * 60 * 60 * 24)
  const result = new Date(targetDayTimestamp)
  if (startOrEnd === 'start') {
    result.setHours(0, 0, 0, 0)
  } else if (startOrEnd === 'end') {
    result.setHours(23, 59, 59, 999)
  }
  if (format === 'timestamp') {
    return +result
  }
  if (format === 'string') {
    return dateToString(result)
  }
  return result
}

/**
 * 获取步进时间，上/下 一 天/周/月
 * @param stepType 步进时间为 天/周/月/
 * @param step 步进大小，正数为【下X天/周/月/】，负数为【上X天/周/月/】
 * @param baseDate 基准时间，默认基于当前时间计算
 * @returns 返回日期对象
 * @example
 * getStepDate('day', -1)
 * getStepDate('week', 2, '2020-01-01')
 */
export const getStepDate = (
  stepType: 'day' | 'week' | 'month',
  step = 1,
  baseDate: string | number | Date = new Date(),
): Date => {
  baseDate = parseToDate(baseDate)
  if (stepType === 'day') {
    const targetDay = baseDate.getDate() + step
    baseDate.setDate(targetDay)
    return baseDate
  }
  if (stepType === 'week') {
    const targetDay = baseDate.getDate() + (step * 7)
    baseDate.setDate(targetDay)
    return baseDate
  }
  if (stepType === 'month') {
    const targetMonth = baseDate.getMonth() + step
    baseDate.setMonth(targetMonth)
    return baseDate
  }
  return baseDate
}

/**
 * 获取开始时间到结束时间的剩余时间的字符串，可以选择长度
 * @param endTime 结束时间
 * @param startTime 开始时间，默认为当前时间
 * @param strLength 倒计时长度，1：秒，2：分秒，3：时分秒，4：天时分秒
 * @returns 返回字符串 xx天xx时xx分xx秒
 * @example
 * getRemainingTime('2020-01-01 10:30:00', undefined, 3)
 */
export const getRemainingTime = (
  endTime: string | number | Date,
  startTime: string | number | Date = new Date(),
  strLength = 4,
): string => {
  endTime = +parseToDate(endTime)
  startTime = +parseToDate(startTime)
  if (Number.isNaN(endTime) || Number.isNaN(startTime)) {
    return ''
  }
  let restTimestamp = endTime - startTime // 1000 * 60 * 60 * 24
  if (restTimestamp < 999) {
    return (strLength >= 4 ? '00天' : '')
      + (strLength >= 3 ? '00时' : '')
      + (strLength >= 2 ? '00分' : '')
      + (strLength >= 1 ? '00秒' : '')
  }
  let ss = null, mm = null, hh = null, DD = null
  if (strLength >= 4) {
    const levelTimestamp = 1000 * 60 * 60 * 24
    DD = Math.floor(restTimestamp / levelTimestamp)
    DD < 10 && (DD = `0${DD}`)
    restTimestamp %= levelTimestamp
  }
  if (strLength >= 3) {
    const levelTimestamp = 1000 * 60 * 60
    hh = Math.floor(restTimestamp / levelTimestamp)
    hh < 10 && (hh = `0${hh}`)
    restTimestamp %= levelTimestamp
  }
  if (strLength >= 2) {
    const levelTimestamp = 1000 * 60
    mm = Math.floor(restTimestamp / levelTimestamp)
    mm < 10 && (mm = `0${mm}`)
    restTimestamp %= levelTimestamp
  }
  if (strLength >= 1) {
    const levelTimestamp = 1000
    ss = Math.floor(restTimestamp / levelTimestamp)
    ss < 10 && (ss = `0${ss}`)
    restTimestamp %= levelTimestamp
  }
  return (DD ? `${DD}天` : '') + (hh ? `${hh}时` : '') + (mm ? `${mm}分` : '') + (ss ? `${ss}秒` : '')
}
