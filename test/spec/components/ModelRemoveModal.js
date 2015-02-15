'use strict';

describe('ModelRemoveModal', function () {
  var React = require('react/addons');
  var ModelRemoveModal, component;

  beforeEach(function () {
    ModelRemoveModal = require('../../../src/scripts/components/ModelRemoveModal.js');
    component = React.createElement(ModelRemoveModal);
  });

  it('should create a new instance of ModelRemoveModal', function () {
    expect(component).toBeDefined();
  });
});
