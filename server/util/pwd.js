const utility = require('utility')

function md5Pwd(pwd) {
  const salt = 'fys520yk'

  return utility.md5(utility.md5(pwd + salt))
}

module.exports = {
  md5Pwd
}