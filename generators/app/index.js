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
          'Component',
          'Simple Admin CRUD page',
          'Feature Toggle (Needs update to use new Timestamp folders)',
          'System Setting (Needs update to use new Timestamp folders)',
          'User Permission (Needs update to use new Timestamp folders)',
          // 'Stateless Component (View Only)',
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
       * Simple CRUD
       */
      if (this.props.type.includes('Simple Admin CRUD page')) {
        this.composeWith("sensei:simpleCRUD", {
          options: { nested: true }
        }, {
          local: require.resolve("./../simpleCRUD")
        });
      }

      /**
       * System Setting
       */
      if (this.props.type.includes('System Setting (Needs update to use new Timestamp folders)')) {
        this.composeWith("sensei:systemSetting", {
          options: { nested: true }
        }, {
          local: require.resolve("./../systemSetting")
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
      if (this.props.type.includes('Component')) {
        this.composeWith("sensei:component-es2015", {
          options: { nested: true }
        }, {
          local: require.resolve("./../component-es2015")
        });
      }

      /**
       * User Permission
       */
      if (this.props.type.includes('User Permission (Needs update to use new Timestamp folders)')) {
        this.composeWith("sensei:userPermission", {
          options: { nested: true }
        }, {
          local: require.resolve("./../userPermission")
        });
      }

      /**
       * Feature Toogle
       */
      if (this.props.type.includes('Feature Toggle (Needs update to use new Timestamp folders)')) {
        this.composeWith("sensei:featureToggle", {
          options: { nested: true }
        }, {
          local: require.resolve("./../featureToggle")
        });
      }
    });
  }
});
