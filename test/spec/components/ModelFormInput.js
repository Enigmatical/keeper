'use strict';

describe('ModelFormInput', function () {
  var React = require('react/addons');
  var ModelFormInput, component;

  beforeEach(function () {
    ModelFormInput = require('../../../src/scripts/components/ModelFormInput.js');
    component = React.createElement(ModelFormInput);
  });

  it('should create a new instance of ModelFormInput', function () {
    expect(component).toBeDefined();
  });
});
