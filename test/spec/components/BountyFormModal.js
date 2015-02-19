'use strict';

describe('BountyFormModal', function () {
  var React = require('react/addons');
  var BountyFormModal, component;

  beforeEach(function () {
    BountyFormModal = require('../../../src/scripts/components/BountyFormModal.js');
    component = React.createElement(BountyFormModal);
  });

  it('should create a new instance of BountyFormModal', function () {
    expect(component).toBeDefined();
  });
});
