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
        name: 'model',
        message: 'What is the ES6 Model Name (e.g. Projects)?',
	  },
	  {
        type: 'input',
        name: 'modelPath',
        message: 'What is the Model Path (e.g. /conductor/...)?',
      },
      {
        type: 'editor',
        name: 'modelSample',
        message: 'Provide a valid JSON sample to build the form',
        filter: rawJSON => JSON.parse(rawJSON)
      },
      {
        type: 'input',
        name: 'componentPath',
        message: 'Where do you want to save this?',
        default: path.normalize(`WebSrc/admin/`)
      },
      {
        type: 'input',
        name: 'tabTitle',
        message: 'What is the TAB title in the admin page'
      },
      {
        type: 'input',
        name: 'linkTitle',
        message: 'What is the LINK title in the admin page'
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
      this.destinationPath(path.normalize(`${process.cwd()}/${this.props.componentPath}/${stringFn.kebabCase(this.props.componentName)}/view.js`)),
      this.props
    )
    this.fs.copyTpl(
      this.templatePath('state.tpl.js'),
      this.destinationPath(path.normalize(`${process.cwd()}/${this.props.componentPath}/${stringFn.kebabCase(this.props.componentName)}/state.js`)),
      this.props
	)
	this.fs.copyTpl(
		this.templatePath('props.tpl.js'),
		this.destinationPath(path.normalize(`${process.cwd()}/${this.props.componentPath}/${stringFn.kebabCase(this.props.componentName)}/props.js`)),
		this.props
	  )
    this.fs.copyTpl(
      this.templatePath('index.tpl.js'),
      this.destinationPath(path.normalize(`${process.cwd()}/${this.props.componentPath}/${stringFn.kebabCase(this.props.componentName)}/index.js`)),
      this.props
    )
  }
});
