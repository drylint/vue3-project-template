import Cryptojs from 'crypto-js'

console.log('Cryptojs------------------------------------------------------------------')

// Cryptojs 只接受字符串类型，对象类型需要先使用 JSON.stringify() 转换，解码时得到的字符串同理也需要使用 JSON.parse() 获取原对象
const msg = 'helloworld'

const myKey = 'hello'

const ciphertext = Cryptojs.AES.encrypt(msg, myKey).toString()
console.log('ciphertext', ciphertext)

const bytes = Cryptojs.AES.decrypt(ciphertext, myKey)
console.log('bytes', bytes)

const originalText = bytes.toString(Cryptojs.enc.Utf8)
console.log('originalText', originalText)

console.log('Cryptojs------------------------------------------------------------------')

// const arr = [MD5, SHA1, SHA224, SHA256, SHA3, SHA384, SHA512]

// arr.forEach(fn => {
//   const str = fn(msg).toString()
//   console.log(fn.name, str.length, str)
// })
