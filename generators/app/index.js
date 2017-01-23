'use strict';
const Generator = require('yeoman-generator');

module.exports = Generator.extend({
  constructor: function () {
    this.destinationRoot(process.cwd())
  },
  prompting: function () {

    const prompts = [
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
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      if (this.props.type === 'Model') {
        this.composeWith("sensei:model", {
          options: {
            nested: true
          }
        }, {
          local: require.resolve("./../model")
        });
      }
    });
  }
});
