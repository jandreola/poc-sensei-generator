'use strict';
const Generator = require('yeoman-generator');
const path = require('path')
const stringFn = require('string-fn')

module.exports = Generator.extend({
  prompting: function () {

    const prompts = [
      {
        type: 'input',
        name: 'componentName',
        message: 'What is the component name?',
        filter: rawString => stringFn.camelCase(rawString)
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
      this.templatePath('statelessComponent.tpl.js'),
      this.destinationPath(path.normalize(`${process.cwd()}/WebSrc/components/${this.props.componentName}/${this.props.componentName}.js`)),
      this.props
    )
    this.fs.copyTpl(
      this.templatePath('readme.tpl.md'),
      this.destinationPath(path.normalize(`${process.cwd()}/WebSrc/components/${this.props.componentName}/readme.md`)),
      this.props
    )
  }
});
