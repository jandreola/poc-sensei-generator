'use strict';
const Generator = require('yeoman-generator');

module.exports = Generator.extend({
  prompting: function () {

    const prompts = [
      {
        type: 'list',
        name: 'type',
        message: 'What do you want to create?',
        choices: [
          'Model',
          'System Setting',
          'Stateless Component (View Only)',
          'Stateful Component - Coming Soon',
          'Widget - Coming Soon'
        ]
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
      /**
       * Model
       */
      if (this.props.type === 'Model') {
        this.composeWith("sensei:model", {
          options: { nested: true }
        }, {
          local: require.resolve("./../model")
        });
      }
      /**
       * System Setting
       */
      if (this.props.type === 'System Setting') {
        this.composeWith("sensei:systemSetting", {
          options: { nested: true }
        }, {
          local: require.resolve("./../systemSetting")
        });
      }
      /**
       * Stateless component
       */
      if (this.props.type === 'Stateless Component (View Only)') {
        this.composeWith("sensei:statelessComponent", {
          options: { nested: true }
        }, {
          local: require.resolve("./../statelessComponent")
        });
      }
    });
  }
});
