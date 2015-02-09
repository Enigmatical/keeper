'use strict';

describe('MainNav', function () {
  var React = require('react/addons');
  var MainNav, component;

  beforeEach(function () {
    MainNav = require('../../../src/scripts/components/MainNav.js');
    component = React.createElement(MainNav);
  });

  it('should create a new instance of MainNav', function () {
    expect(component).toBeDefined();
  });
});
