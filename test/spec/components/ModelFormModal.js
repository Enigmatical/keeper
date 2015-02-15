'use strict';

describe('ModelFormModal', function () {
  var React = require('react/addons');
  var ModelFormModal, component;

  beforeEach(function () {
    ModelFormModal = require('../../../src/scripts/components/ModelFormModal.js');
    component = React.createElement(ModelFormModal);
  });

  it('should create a new instance of ModelFormModal', function () {
    expect(component).toBeDefined();
  });
});
