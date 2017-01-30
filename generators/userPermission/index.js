'use strict';
const Generator = require('yeoman-generator');
const getDirectories = require('../../utilities/getDirectories')
const getFolderName = require('../../utilities/getFolderName')
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
        name: 'permissionName',
        message: 'Permission name',
      },
      {
        type: 'input',
        name: 'permissionDisplayName',
        message: 'Permission display name'
      },
      {
        type: 'input',
        name: 'permissionDescription',
        message: 'Permission description:'
      },
      {
        type: 'input',
        name: 'taskID',
        message: 'What is the task ID?'
      },
      {
        type: 'input',
        name: 'Author',
        message: 'Author',
        store   : true
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
      this.templatePath('userPermission.tpl.sql'),
      this.destinationPath(path.normalize(`${process.cwd()}/SchemaMigration/${getFolderName(getDirectories(), this.props.taskID)}/001 - New Permission ${this.props.systemSettingKey}.sql`)),
      this.props
    )
  }
});
