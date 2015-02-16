'use strict';

describe('MainBreadcrumb', function () {
  var React = require('react/addons');
  var MainBreadcrumb, component;

  beforeEach(function () {
    MainBreadcrumb = require('../../../src/scripts/components/MainBreadcrumb.js');
    component = React.createElement(MainBreadcrumb);
  });

  it('should create a new instance of MainBreadcrumb', function () {
    expect(component).toBeDefined();
  });
});
