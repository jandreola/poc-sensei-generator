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
        name: 'componentPath',
        message: 'Where do you want to save this?',
        default: path.normalize(`WebSrc/widgets/`)
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
      this.destinationPath(path.normalize(`${process.cwd()}/${this.props.componentPath}/${stringFn.kebabCase(this.props.componentName)}/controller.js`)),
      this.props
    )
    this.fs.copyTpl(
      this.templatePath('view.tpl.js'),
      this.destinationPath(path.normalize(`${process.cwd()}/${this.props.componentPath}/${stringFn.kebabCase(this.props.componentName)}/views/index.js`)),
      this.props
    )
    this.fs.copyTpl(
      this.templatePath('state.tpl.js'),
      this.destinationPath(path.normalize(`${process.cwd()}/${this.props.componentPath}/${stringFn.kebabCase(this.props.componentName)}/state.js`)),
      this.props
    )
    this.fs.copyTpl(
      this.templatePath('index.tpl.js'),
      this.destinationPath(path.normalize(`${process.cwd()}/${this.props.componentPath}/${stringFn.kebabCase(this.props.componentName)}/index.js`)),
      this.props
    )
    this.fs.copyTpl(
      this.templatePath('props.tpl.js'),
      this.destinationPath(path.normalize(`${process.cwd()}/${this.props.componentPath}/${stringFn.kebabCase(this.props.componentName)}/props.js`)),
      this.props
    )
    this.fs.copyTpl(
      this.templatePath('styles.tpl.scss'),
      this.destinationPath(path.normalize(`${process.cwd()}/${this.props.componentPath}/${stringFn.kebabCase(this.props.componentName)}/styles.scss`)),
      this.props
    )
    this.fs.copyTpl(
      this.templatePath('controller_test.tpl.js'),
      this.destinationPath(path.normalize(`${process.cwd()}/${this.props.componentPath}/${stringFn.kebabCase(this.props.componentName)}/tests/controller_test.js`)),
      this.props
    )
  }
});
