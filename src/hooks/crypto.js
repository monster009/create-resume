import CryptoJS from "crypto-js";
// 十六位十六进制数作为密钥
const SECRET_KEY = CryptoJS.enc.Utf8.parse("503d694049b06ec7")
// 十六位十六进制数作为密钥偏移量
const SECRET_IV = CryptoJS.enc.Utf8.parse("12b7633875ebafb6")

/**
 * 加密方法
 * @param data
 * @returns {string}
 */
 export function encrypt(data) {
  if (typeof data === "object") {
    try {
      // eslint-disable-next-line no-param-reassign
      data = JSON.stringify(data);
    } catch (error) {
      console.log("encrypt error:", error);
    }
  }
  const dataHex = CryptoJS.enc.Utf8.parse(data);
  const encrypted = CryptoJS.AES.encrypt(dataHex, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString();
}

/**
 * 解密方法
 * @param data
 * @returns {string}
 */
 export function decrypt(data) {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
  const str = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(str, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}