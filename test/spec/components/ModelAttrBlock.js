'use strict';

describe('ModelAttrBlock', function () {
  var React = require('react/addons');
  var ModelAttrBlock, component;

  beforeEach(function () {
    ModelAttrBlock = require('../../../src/scripts/components/ModelAttrBlock.js');
    component = React.createElement(ModelAttrBlock);
  });

  it('should create a new instance of ModelAttrBlock', function () {
    expect(component).toBeDefined();
  });
});
