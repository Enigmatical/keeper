'use strict';

describe('ModelLinkModal', function () {
  var React = require('react/addons');
  var ModelLinkModal, component;

  beforeEach(function () {
    ModelLinkModal = require('../../../src/scripts/components/ModelLinkModal.js');
    component = React.createElement(ModelLinkModal);
  });

  it('should create a new instance of ModelLinkModal', function () {
    expect(component).toBeDefined();
  });
});
