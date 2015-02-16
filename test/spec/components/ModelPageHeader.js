'use strict';

describe('ModelPageHeader', function () {
  var React = require('react/addons');
  var ModelPageHeader, component;

  beforeEach(function () {
    ModelPageHeader = require('../../../src/scripts/components/ModelPageHeader.js');
    component = React.createElement(ModelPageHeader);
  });

  it('should create a new instance of ModelPageHeader', function () {
    expect(component).toBeDefined();
  });
});
