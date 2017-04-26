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
          'Component ES2015',
          'Component',
          'Model',
          'Feature Toggle',
          'System Setting',
          'User Permission',
          'Stateless Component (View Only)',
          'Stateless Component (View Only) ES2015 (Coming Soon)',
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
       * Stateless component ES 2015
       */
      if (this.props.type.includes('Stateless Component (View Only) ES2015')) {
        this.composeWith("sensei:statelessComponentes2015", {
          options: { nested: true }
        }, {
          local: require.resolve("./../statelessComponent-es2015")
        });
      }

      /**
       * Component ES 2015
       */
      if (this.props.type.includes('Component ES2015')) {
        this.composeWith("sensei:component-es2015", {
          options: { nested: true }
        }, {
          local: require.resolve("./../component-es2015")
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

      /**
       * Feature Toogle
       */
      if (this.props.type.includes('Feature Toggle')) {
        this.composeWith("sensei:featureToggle", {
          options: { nested: true }
        }, {
          local: require.resolve("./../featureToggle")
        });
      }
    });
  }
});
