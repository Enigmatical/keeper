'use strict';

describe('FoeFormModal', function () {
  var React = require('react/addons');
  var FoeFormModal, component;

  beforeEach(function () {
    FoeFormModal = require('../../../src/scripts/components/FoeFormModal.js');
    component = React.createElement(FoeFormModal);
  });

  it('should create a new instance of FoeFormModal', function () {
    expect(component).toBeDefined();
  });
});
