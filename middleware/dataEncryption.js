const crypto = require('crypto');

const { ENCRYPT_SECRET } = process.env;
const algorithm = 'aes-256-ctr';
const iv = crypto.randomBytes(16);

const asciiToHexa = (str) => {
  const arr1 = [''];
  for (let n = 0, l = str.length; n < l; n++) {
    const hex = Number(str.charCodeAt(n)).toString(16);
    arr1.push(hex);
  }
  return arr1.join('');
};

const hexToAscii = (str1) => {
  const hex = str1.toString();
  let str = '';
  for (let n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
};

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, ENCRYPT_SECRET, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  const string = JSON.stringify({
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  });
  return asciiToHexa(string);
};

const decrypt = (hash) => {
  const string = hexToAscii(hash);
  const obj = JSON.parse(string);
  const decipher = crypto.createDecipheriv(
    algorithm,
    ENCRYPT_SECRET,
    Buffer.from(obj.iv, 'hex')
  );

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(obj.content, 'hex')),
    decipher.final(),
  ]);

  return decrypted.toString();
};

module.exports = {
  encrypt,
  decrypt,
};
