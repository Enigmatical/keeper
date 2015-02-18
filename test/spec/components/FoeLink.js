'use strict';

describe('FoeLink', function () {
  var React = require('react/addons');
  var FoeLink, component;

  beforeEach(function () {
    FoeLink = require('../../../src/scripts/components/FoeLink.js');
    component = React.createElement(FoeLink);
  });

  it('should create a new instance of FoeLink', function () {
    expect(component).toBeDefined();
  });
});
