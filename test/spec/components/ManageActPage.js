'use strict';

describe('ManageActPage', function () {
  var React = require('react/addons');
  var ManageActPage, component;

  beforeEach(function () {
    ManageActPage = require('../../../src/scripts/components/ManageActPage.js');
    component = React.createElement(ManageActPage);
  });

  it('should create a new instance of ManageActPage', function () {
    expect(component).toBeDefined();
  });
});
