
const Abi = require('../Abi.js')
// console.log('Abi', Abi)

function parseJSON(res) {
  return res.json()
}

function fetchFactory(url, params) {

  if (options == undefined) {
    return fetch(this.prefix + url)
  }
  
  let __options = {
    method: 'POST',
    headers: {
      contentType: 'application/json'
    },
    body: JSON.stringify(params)
  }

  return fetch(this.prefix + url, options)
}

/**
 * 
 * @param {Object} config 
 * @param {string} config.baseUrl
 * @param {string} config.version
 */
function RequestManager(config) {
  this.prefix = config.baseUrl + '/' + config.version
  this.request = fetchFactory
}

/**
 * @returns {Object} blockHeader
 */
RequestManager.prototype.getBlockHeader = function () {
  return this.request('/block/height')
    .then(parseJSON)
    .then((blockHeader) => {
      if (!(blockHeader && blockHeader.code == 1)) {
        throw new Error('GetBlockHeader error')
      }
      let __blockHeader = {}
      let data = blockHeader.data
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
  return this.request(url, { contract })
  .then(parseJSON)
  .then((res) => {
    if (res.errcode == '0') {
      const abiJSON = res.result
      const abi = JSON.parse(abiJSON)
      cb(abi)
    }
  })
  .catch((err) => {
    cb(Abi)
  })
}

/**
 * register the account
 * @param {} 
 */
RequestManager.prototype.register = function () {
  return this.getBlockHeader()
    .then((blockHeader) => {
      console.log('blockHeader', blockHeader)
    })
    .catch(err => {
      console.error('register error: ', err)
    })
}

module.exports = RequestManager