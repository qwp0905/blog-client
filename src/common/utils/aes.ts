import cryptoJs from 'crypto-js'

// 암호화
export const encryptAES = (text: string) => {
  const secret_key = process.env.REACT_APP_AES_KEY as string
  const iv = cryptoJs.SHA1(`${Math.random()}`)

  const cipher = cryptoJs.AES.encrypt(text, cryptoJs.enc.Utf8.parse(secret_key), {
    iv,
    padding: cryptoJs.pad.Pkcs7,
    mode: cryptoJs.mode.CBC
  })

  return cipher.toString(cryptoJs.format.Hex) + iv.toString(cryptoJs.enc.Hex)
}

// 복호화
export const decryptAES = (text: string) => {
  const secret_key = process.env.REACT_APP_AES_KEY as string
  const iv = text.slice(32)
  const encrypted = text.slice(0, 32)

  const decipher = cryptoJs.AES.decrypt(encrypted, cryptoJs.enc.Utf8.parse(secret_key), {
    format: cryptoJs.format.Hex,
    iv: cryptoJs.enc.Hex.parse(iv),
    padding: cryptoJs.pad.Pkcs7,
    mode: cryptoJs.mode.CBC
  })

  return decipher.toString(cryptoJs.enc.Utf8)
}
