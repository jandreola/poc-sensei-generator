'use strict';
const Generator = require('yeoman-generator');
const path = require('path')

module.exports = Generator.extend({
  prompting: function () {

    const prompts = [
      {
        type: 'input',
        name: 'componentName',
        message: 'What is the component name?',
      },
      {
        type: 'input',
        name: 'componentPath',
        message: 'What is the component namespace (nested with dots i.e. component.widget)',
        default: 'component'
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
      this.templatePath('statelessComponent.tpl.js'),
      this.destinationPath(path.normalize(`${process.cwd()}/Web/global/component/${this.props.componentName}.js`)),
      this.props
    )
    this.log(path.normalize(`${process.cwd()}/Web/global/component/${this.props.componentName}.js`))
  }
});
