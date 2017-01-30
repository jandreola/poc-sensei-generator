const path = require('path')
const fs = require('fs')

module.exports = function getFolderName(folderNames, taskID) {
  const regex = /_?Release\s(\d+) - \d+/g // matches _Release (000) - 000000
  var last = "000"
  var pad = "000"
  folderNames.map(folder => {
    let number = regex.exec(folder)
    if (number && number[1] > last) last = number[1]
  })
  last = +last + 1
  last += ''
  return `Release ${pad.substring(0, pad.length - last.length) + last} - ${taskID}`
}

