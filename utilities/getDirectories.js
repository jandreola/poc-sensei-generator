const path = require('path')
const fs = require('fs')

module.exports = function getDirectories() {
  const srcpath = `${process.cwd()}/SchemaMigration/`
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}
