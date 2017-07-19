import * as CryptoJS from '../../node_modules/crypto-js/crypto-js';

function encrypt(plainText, secret) {
  if (plainText && secret) {
    return CryptoJS.AES.encrypt(JSON.stringify(plainText), secret).toString();
  }
}

function decrypt(cipherText, secret) {
  if (cipherText && secret) {
    var bytes = CryptoJS.AES.decrypt(cipherText, secret);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
}

export { encrypt, decrypt };
