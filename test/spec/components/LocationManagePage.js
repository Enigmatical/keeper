'use strict';

describe('LocationManagePage', function () {
  var React = require('react/addons');
  var LocationManagePage, component;

  beforeEach(function () {
    LocationManagePage = require('../../../src/scripts/components/LocationManagePage.js');
    component = React.createElement(LocationManagePage);
  });

  it('should create a new instance of LocationManagePage', function () {
    expect(component).toBeDefined();
  });
});
