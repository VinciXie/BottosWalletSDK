
const Abi = require('../Abi.js')
const registerParam = require('./register.js')
const querystring = require('querystring')
// console.log('Abi', Abi)

function parseJSON(res) {
  return res.json()
}

/**
 * 
 * @param {string} url 
 * @param {Object} params 
 * @param {string} method 
 */
function fetchFactory(url, params, method = 'POST') {
  console.log(' fetchFactory, url, params: ', url, params)

  if (method.toUpperCase() == 'GET') {
    let paramStr = ''
    if (params && typeof params == 'object') {
      paramStr = '?' + querystring.stringify(params)
    }
    
    const CORSOptions = {
      method: 'GET',
      mode: 'cors',
    }
    return fetch(this.prefix + url + paramStr, CORSOptions)
  }

  let __options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      contentType: 'application/json'
    },
    body: JSON.stringify(params)
  }

  return fetch(this.prefix + url, __options)
}

/**
 * 
 * @param {Object} config 
 * @param {string} config.baseUrl
 * @param {string} config.version
 */
function RequestManager(config) {
  this.prefix = config.baseUrl + '/' + config.version
}

RequestManager.prototype.request = fetchFactory

/**
 * @returns {Object} blockHeader
 */
RequestManager.prototype.getBlockHeader = function () {
  console.log(' block/height getBlockHeader')

  return this.request('/block/height', null, 'GET')
    .then(parseJSON, rej => {
      let res = { "errcode": 0, "msg": "", "result": { "head_block_num": 2845, "head_block_hash": "862934b076f4ff07d1411e5335d119a92d92533718154c7fbacce9f4ea217bc4", "head_block_time": 1536830784, "head_block_delegate": "bottos", "cursor_label": 3928062916, "last_consensus_block_num": 2845, "chain_id": "4b97b92d2c78bcffe95ebd3067565c73a2931b39d5eb7234b11816dcec54761a" } }
      return res
    })
    .then((res) => {
      console.log('res', res)
      if (!(res && res.errcode == 0)) {
        throw new Error('GetBlockHeader error')
      }
      let __blockHeader = {}
      let data = res.result
      __blockHeader.cursor_label = data.cursor_label
      __blockHeader.cursor_num = data.head_block_num
      __blockHeader.lifetime = data.head_block_time + 300
      return __blockHeader
    })
}

/**
 * This callback type is called `requestAbiCallback`.
 * @callback requestAbiCallback
 * @param {Object} abi
 */

/**
 * Returns the abi 
 * @param {string} contract 
 * @param {requestAbiCallback} cb
 */
RequestManager.prototype.getAbi = function (contract, cb) {
  const url = '/contract/abi'
  return this.request(url, { contract }).then(parseJSON)
}

/**
 * register the account
 * @param {string} account - account
 * @param {Object} keys - Public and private key pair
 * @param {string} referrer - referrer
 * @returns {Promise}
 */
RequestManager.prototype.register = function (account, keys, referrer) {
  return this.getBlockHeader()
    .then((blockHeader) => {
      // console.log('blockHeader', blockHeader)
      let url = '/transaction/send'
      
      let fetchTemplate = registerParam(account, keys, blockHeader, referrer)
      console.log('fetchTemplate', JSON.stringify(fetchTemplate))
      return this.request(url, fetchTemplate).then(parseJSON)
    })
    .catch(err => {
      console.error('register error: ', err)
    })
}

module.exports = RequestManager