'use strict';

describe('ModelUnlinkModal', function () {
  var React = require('react/addons');
  var ModelUnlinkModal, component;

  beforeEach(function () {
    ModelUnlinkModal = require('../../../src/scripts/components/ModelUnlinkModal.js');
    component = React.createElement(ModelUnlinkModal);
  });

  it('should create a new instance of ModelUnlinkModal', function () {
    expect(component).toBeDefined();
  });
});
