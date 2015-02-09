'use strict';

describe('LogoutButton', function () {
  var React = require('react/addons');
  var LogoutButton, component;

  beforeEach(function () {
    LogoutButton = require('../../../src/scripts/components/LogoutButton.js');
    component = React.createElement(LogoutButton);
  });

  it('should create a new instance of LogoutButton', function () {
    expect(component).toBeDefined();
  });
});
