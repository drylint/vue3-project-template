// 获取数据类型
export const getType = (value: unknown): string => Object.prototype.toString.call(value).slice(8, -1)

// 将金额转换为 ￥xx.yy
export const currency = (value: number | string): string => `￥${(+value).toFixed(2)}`

// 十六进制颜色字符串转 rgba 字符串
export const hexColorToRgba = (hexColor: string, alpha = 1): string => {
  const reg = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/iu
  if (!reg.test(hexColor)) {
    return hexColor
  }
  hexColor = hexColor.toLowerCase()
  // 如果是 缩写，转为全写， 比如 #fff 转为 #ffffff
  if (hexColor.length === 4) {
    let fullHexColor = '#'
    for (let i = 1; i < 4; i++) {
      fullHexColor += `${hexColor[i]}${hexColor[i]}`
    }
    hexColor = fullHexColor
  }
  const rgbArray = []
  for (let i = 1; i < 7; i += 2) {
    rgbArray.push(parseInt(`0x${hexColor.slice(i, i + 2)}`))
  }
  return `rgba(${rgbArray.join(', ')}, ${alpha})`
}

// 深冻结
export const deepFreeze = <T>(value: T): T => {
  if (Array.isArray(value)) {
    value.forEach(deepFreeze)
  } else if (Object.prototype.toString.call(value) === '[object Object]') {
    const values = Object.values(value as unknown as { [x: string]: unknown })
    values.forEach(deepFreeze)
  } else {
    Object.freeze(value)
  }
  return value
}

// 获取随机数
export const getRandomNumber = (start: number, end: number): number => {
  const result = Number.parseInt(`${(Math.random() * (end - start)) + start}`)
  return result
}

// 获取一个随机 key
export const getRandomKey = (length = 10): string => {
  const num = '0123456789'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const chars = `${num}${lowercase}${uppercase}`
  const end = chars.length
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars[getRandomNumber(0, end)]
  }
  return result
}
