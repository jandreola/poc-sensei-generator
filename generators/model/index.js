'use strict';
const Generator = require('yeoman-generator');
const path = require('path')

module.exports = Generator.extend({
  prompting: function () {

    const prompts = [
      {
        type: 'input',
        name: 'modelName',
        message: 'What is the model name?',
      },
      {
        type: 'input',
        name: 'modelUrl',
        message: 'What is the API endpoint for this model?'
      },
      {
        type: 'input',
        name: 'modelID',
        message: 'What is the primary key (ID) for this model?'
      },
      {
        type: 'input',
        name: 'modelLabel',
        message: 'Which property should be used as label?'
      },
      {
        type: 'input',
        name: 'modelPath',
        message: 'Where do you want to save this Model?',
        default: path.normalize(`${process.cwd()}/Web/global/model`)
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
      this.templatePath('model.tpl.js'),
      this.destinationPath(path.normalize(`${this.props.modelPath}/${this.props.modelName}.js`)),
      this.props
    )
    this.log(path.normalize(`${this.props.modelPath}/${this.props.modelName}.js`))
  }
});