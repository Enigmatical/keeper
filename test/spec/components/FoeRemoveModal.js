'use strict';

describe('FoeRemoveModal', function () {
  var React = require('react/addons');
  var FoeRemoveModal, component;

  beforeEach(function () {
    FoeRemoveModal = require('../../../src/scripts/components/FoeRemoveModal.js');
    component = React.createElement(FoeRemoveModal);
  });

  it('should create a new instance of FoeRemoveModal', function () {
    expect(component).toBeDefined();
  });
});
