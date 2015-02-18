'use strict';

describe('FoeUnlinkModal', function () {
  var React = require('react/addons');
  var FoeUnlinkModal, component;

  beforeEach(function () {
    FoeUnlinkModal = require('../../../src/scripts/components/FoeUnlinkModal.js');
    component = React.createElement(FoeUnlinkModal);
  });

  it('should create a new instance of FoeUnlinkModal', function () {
    expect(component).toBeDefined();
  });
});
