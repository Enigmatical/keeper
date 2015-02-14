'use strict';

describe('AddActModal', function () {
  var React = require('react/addons');
  var AddActModal, component;

  beforeEach(function () {
    AddActModal = require('../../../src/scripts/components/AddActModal.js');
    component = React.createElement(AddActModal);
  });

  it('should create a new instance of AddActModal', function () {
    expect(component).toBeDefined();
  });
});
