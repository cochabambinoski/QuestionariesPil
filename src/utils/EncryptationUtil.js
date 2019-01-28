
export function encryptMD5(password) {
    const md5 = require('md5');
    return md5(password);
}