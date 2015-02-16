'use strict';

describe('LocationRemoveModal', function () {
  var React = require('react/addons');
  var LocationRemoveModal, component;

  beforeEach(function () {
    LocationRemoveModal = require('../../../src/scripts/components/LocationRemoveModal.js');
    component = React.createElement(LocationRemoveModal);
  });

  it('should create a new instance of LocationRemoveModal', function () {
    expect(component).toBeDefined();
  });
});
