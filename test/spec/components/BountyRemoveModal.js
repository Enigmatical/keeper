'use strict';

describe('BountyRemoveModal', function () {
  var React = require('react/addons');
  var BountyRemoveModal, component;

  beforeEach(function () {
    BountyRemoveModal = require('../../../src/scripts/components/BountyRemoveModal.js');
    component = React.createElement(BountyRemoveModal);
  });

  it('should create a new instance of BountyRemoveModal', function () {
    expect(component).toBeDefined();
  });
});
