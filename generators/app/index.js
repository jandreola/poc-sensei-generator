'use strict';
const Generator = require('yeoman-generator');

module.exports = Generator.extend({
  prompting: function () {

    const prompts = [
      {
        type: 'checkbox',
        name: 'type',
        message: 'What do you want to create?',
        choices: [
          'Model',
          'Stateless Component (View Only)',
          'Component',
          'System Setting',
          'User Permission'
        ]
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;

      /**
       * Model
       */
      if (this.props.type.includes('Model')) {
        this.composeWith("sensei:model", {
          options: { nested: true }
        }, {
          local: require.resolve("./../model")
        });
      }

      /**
       * System Setting
       */
      if (this.props.type.includes('System Setting')) {
        this.composeWith("sensei:systemSetting", {
          options: { nested: true }
        }, {
          local: require.resolve("./../systemSetting")
        });
      }

      /**
       * Stateless component
       */
      if (this.props.type.includes('Stateless Component (View Only)')) {
        this.composeWith("sensei:statelessComponent", {
          options: { nested: true }
        }, {
          local: require.resolve("./../statelessComponent")
        });
      }

      /**
       * Component
       */
      if (this.props.type.includes('Component')) {
        this.composeWith("sensei:component", {
          options: { nested: true }
        }, {
          local: require.resolve("./../component")
        });
      }

      /**
       * User Permission
       */
      if (this.props.type.includes('User Permission')) {
        this.composeWith("sensei:userPermission", {
          options: { nested: true }
        }, {
          local: require.resolve("./../userPermission")
        });
      }
    });
  }
});
