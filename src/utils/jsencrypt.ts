import JSEncrypt from 'jsencrypt'

const jsencrypt = new JSEncrypt({
  // @ts-ignore
  default_key_size: 1024,
})

console.log(jsencrypt)

const priKey = jsencrypt.getPrivateKey()

const pubKey = jsencrypt.getPublicKey()

console.log(priKey, pubKey)
