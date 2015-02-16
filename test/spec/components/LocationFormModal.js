'use strict';

describe('LocationFormModal', function () {
  var React = require('react/addons');
  var LocationFormModal, component;

  beforeEach(function () {
    LocationFormModal = require('../../../src/scripts/components/LocationFormModal.js');
    component = React.createElement(LocationFormModal);
  });

  it('should create a new instance of LocationFormModal', function () {
    expect(component).toBeDefined();
  });
});
