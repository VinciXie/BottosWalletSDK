const BTCrypto = require('bottos-crypto-js');

const RequestManager = require('./requestmanager')
const Wallet = require('./wallet')

console.log('BTCrypto', BTCrypto);

const defaultConfig = {
  baseUrl: '127.0.0.1:8689',
  version: 'v1' // version
}

function SDK(config = defaultConfig) {
  this.config = config
  this._requestManager = new RequestManager(config);
  this.wallet = new Wallet(this._requestManager)
}

const sdk = new SDK()
console.log('sdk', sdk);

function test() {
  
  const keys = sdk.wallet.createKeys()
  console.log('公私钥对 keys: ', keys)
  
  // const keystoreParam = {
  //   account: 'adfa',
  //   password: 'afafafaf',
  //   privateKey: keys.privateKey
  // }
  // const keystore = sdk.wallet.createKeystore(keystoreParam)
  // console.log('keystore: ', keystore)

  // const pk = sdk.wallet.recoverKeystore(keystoreParam.password, keystore)
  // console.log('pk: ', pk)

  const account = sdk.wallet.createAccount()
  console.log('account', account)

}

test()