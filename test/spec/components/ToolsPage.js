'use strict';

describe('ToolsPage', function () {
  var React = require('react/addons');
  var ToolsPage, component;

  beforeEach(function () {
    ToolsPage = require('../../../src/scripts/components/ToolsPage.js');
    component = React.createElement(ToolsPage);
  });

  it('should create a new instance of ToolsPage', function () {
    expect(component).toBeDefined();
  });
});
