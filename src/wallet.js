const BTCrypto = require('bottos-crypto-js');
const keystore = BTCrypto.keystore
console.log('keystore', keystore)

/**
 * 
 * @param {Object} _requestManager 
 */
function Wallet(_requestManager) {
  this._requestManager = _requestManager
}

/**
 * register account on chain
 * @param {string} account - account
 * @param {Object} keys - Public and private key pair
 * @param {string} referrer - referrer
 */
Wallet.prototype.createAccount = function (account, keys, referrer) {
  // console.log('this', this)
  return this._requestManager.register(account, keys, referrer)
}

/**
 * create public and private keys
 * @returns {Object} keys
 */
Wallet.prototype.createKeys = function() {
  return keystore.createKeys()
  // return BTCrypto.createPubPrivateKeys()
}

// account: "adfa",
// crypto: { cipher: "aes-128-ctr", ciphertext: "54f831f74056a683f758c27df56cf460671fae59549894aa4fb4a9935d0eccd6", cipherparams: { … }, mac: "0300f99245dea92dfe22dcc083ebe171f1c172871b4686a03b03e272c0139253", kdf: "scrypt", … },
// id: "12f16bd2-3d1e-4dfd-98d9-b1124c9d084b",
// version: 3,

/**
 * @param {Object} params - the params required for create keystore
 * @param {string} params.account - account
 * @param {string} params.password - password
 * @param {*} [params.privateKey] - privateKey
 * @returns {Object} keystore
 */
Wallet.prototype.createKeystore = function (params) {
  const account = params.account,
    password = params.password,
    privateKey = params.privateKey
  return keystore.create({ account, password, privateKey })
}

/**
 * 
 * @param {string} password - password
 * @param {Object} keyObject - the keystore
 * @returns {ArrayBuffer} privateKey - privateKey
 */
Wallet.prototype.recoverKeystore = keystore.recover.bind(keystore)

Wallet.prototype.signTransaction = function() {

}

Wallet.prototype.sendTransaction = function() {

}

module.exports = Wallet