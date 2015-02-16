'use strict';

describe('AreaManagePage', function () {
  var React = require('react/addons');
  var AreaManagePage, component;

  beforeEach(function () {
    AreaManagePage = require('../../../src/scripts/components/AreaManagePage.js');
    component = React.createElement(AreaManagePage);
  });

  it('should create a new instance of AreaManagePage', function () {
    expect(component).toBeDefined();
  });
});
