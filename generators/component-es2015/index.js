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
      this.templatePath('controller.tpl.js'),
      this.destinationPath(path.normalize(`${process.cwd()}/WebSrc/widgets/${this.props.componentName}/controller.js`)),
      this.props
    )
    this.fs.copyTpl(
      this.templatePath('view.tpl.js'),
      this.destinationPath(path.normalize(`${process.cwd()}/WebSrc/widgets/${this.props.componentName}/view.js`)),
      this.props
    )
    this.fs.copyTpl(
      this.templatePath('vm.tpl.js'),
      this.destinationPath(path.normalize(`${process.cwd()}/WebSrc/widgets/${this.props.componentName}/vm.js`)),
      this.props
    )
    this.fs.copyTpl(
      this.templatePath('index.tpl.js'),
      this.destinationPath(path.normalize(`${process.cwd()}/WebSrc/widgets/${this.props.componentName}/index.js`)),
      this.props
    )
    this.fs.copyTpl(
      this.templatePath('readme.tpl.md'),
      this.destinationPath(path.normalize(`${process.cwd()}/WebSrc/widgets/${this.props.componentName}/readme.md`)),
      this.props
    )
  }
});
