'use strict';

describe('FoeLinkModal', function () {
  var React = require('react/addons');
  var FoeLinkModal, component;

  beforeEach(function () {
    FoeLinkModal = require('../../../src/scripts/components/FoeLinkModal.js');
    component = React.createElement(FoeLinkModal);
  });

  it('should create a new instance of FoeLinkModal', function () {
    expect(component).toBeDefined();
  });
});
