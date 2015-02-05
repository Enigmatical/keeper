'use strict';

describe('Main', function () {
  var React = require('react/addons');
  var KeeperApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    KeeperApp = require('../../../src/scripts/components/KeeperApp.js');
    component = React.createElement(KeeperApp);
  });

  it('should create a new instance of KeeperApp', function () {
    expect(component).toBeDefined();
  });
});
