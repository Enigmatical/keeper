'use strict';

describe('FoeManagePage', function () {
  var React = require('react/addons');
  var FoeManagePage, component;

  beforeEach(function () {
    FoeManagePage = require('../../../src/scripts/components/FoeManagePage.js');
    component = React.createElement(FoeManagePage);
  });

  it('should create a new instance of FoeManagePage', function () {
    expect(component).toBeDefined();
  });
});
