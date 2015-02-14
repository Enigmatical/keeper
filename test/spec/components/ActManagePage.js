'use strict';

describe('ActManagePage', function () {
  var React = require('react/addons');
  var ActManagePage, component;

  beforeEach(function () {
    ActManagePage = require('../../../src/scripts/components/ActManagePage.js');
    component = React.createElement(ActManagePage);
  });

  it('should create a new instance of ActManagePage', function () {
    expect(component).toBeDefined();
  });
});
