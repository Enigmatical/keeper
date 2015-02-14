'use strict';

describe('ActFormModal', function () {
  var React = require('react/addons');
  var ActFormModal, component;

  beforeEach(function () {
    ActFormModal = require('../../../src/scripts/components/ActFormModal.js');
    component = React.createElement(ActFormModal);
  });

  it('should create a new instance of ActFormModal', function () {
    expect(component).toBeDefined();
  });
});
