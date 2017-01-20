'use strict';
var Generator = require('yeoman-generator');

module.exports = Generator.extend({
	prompting: function () {

		var prompts = [
			{
				type: 'list',
				name: 'type',
				message: 'What do you want to create?',
				choices: [
					'Model',
					'Stateless Component (View Only)',
					'Stateful Component',
					'Widget'
				]
			},
			{
				when: answers => answers.type === 'Model',
				type: 'input',
				name: 'modelName',
				message: 'What is the model name?',
			},
			{
				when: answers => answers.type === 'Model',
				type: 'input',
				name: 'modelUrl',
				message: 'What is the API endpoint for this model?'
			},
			{
				when: answers => answers.type === 'Model',
				type: 'input',
				name: 'modelID',
				message: 'What is the ID for this model?'
			},
			{
				when: answers => answers.type === 'Model',
				type: 'input',
				name: 'modelLabel',
				message: 'Which property should be used as label?'
			},
      {
        when: answers => answers.type === 'Model',
        type: 'input',
        name: 'modelPath',
        message: 'Where do you want to save this Model?'
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
		});
	},

	writing() {
		if (this.props.type === 'Model') {
			this.fs.copyTpl(
				this.templatePath('model.tpl.js'),
				this.destinationPath(`${this.props.modelPath}/${this.props.modelName}.js`),
				this.props
			)
		}
	}
});
