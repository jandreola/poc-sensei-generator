'use strict';
const Generator = require('yeoman-generator');
const path = require('path')
const fs = require('fs')

function getDirectories() {
  const srcpath = `${process.cwd()}/SchemaMigration/`
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function getFolderName(folderNames, taskID) {
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

module.exports = Generator.extend({
  prompting: function () {

    const prompts = [
      {
        type: 'input',
        name: 'systemSettingKey',
        message: 'What is the system setting key?',
      },
      {
        type: 'input',
        name: 'systemSettingValue',
        message: 'What is the value? (Don\'t forget quote for strings)'
      },
      {
        type: 'input',
        name: 'systemSettingDescription',
        message: 'Description:'
      },
      {
        type: 'input',
        name: 'taskID',
        message: 'What is the task ID?'
      },
      {
        type: 'input',
        name: 'Author',
        message: 'Author'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    })
  },

  writing() {
    this.destinationRoot(process.cwd())
    this.fs.copyTpl(
      this.templatePath('systemSetting.tpl.sql'),
      this.destinationPath(path.normalize(`${process.cwd()}/SchemaMigration/${getFolderName(getDirectories(), this.props.taskID)}/001 - New System Setting ${this.props.systemSettingKey}.sql`)),
      this.props
    )
  }
});
