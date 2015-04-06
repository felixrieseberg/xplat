/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var app = new EmberApp();
// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
// nwjs requires a package.json in order to runu anything

// these in-line vars are only used by test runs
var app;

// brocfile-env module hasn't been decided on how to expose more build options

if (process.env.TEST_IN_NW) {
    app = new EmberApp({
      inlineContent: {
        'qunit-logger': './tests/helpers/qunit-logger.js',
        'test-base': {
            content: '<base href=\"../\"/>'
        }
      }
    });
} else {
    app = new EmberApp();
}

var tree = new Funnel('tests', {
    files: ['package.json'],
    destDir: 'tests'
});

if (process.env.TEST_IN_NW) {
    module.exports = mergeTrees([app.toTree(), tree]);
} else {
    module.exports = app.toTree();
}
