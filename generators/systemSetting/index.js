'use strict';
const Generator = require('yeoman-generator');
const getDirectories = require('../../utilities/getDirectories')
const getFolderName = require('../../utilities/getFolderName')
const path = require('path')
const fs = require('fs')

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
        message: 'What is the SS value?'
      },
      {
        type: 'input',
        name: 'systemSettingDescription',
        message: 'System setting description:'
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
      this.templatePath('systemSetting.tpl.sql'),
      this.destinationPath(path.normalize(`${process.cwd()}/SchemaMigration/${getFolderName(getDirectories(), this.props.taskID)}/001 - New System Setting ${this.props.systemSettingKey}.sql`)),
      this.props
    )
  }
});
