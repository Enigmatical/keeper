'use strict';

describe('RemoveActModal', function () {
  var React = require('react/addons');
  var RemoveActModal, component;

  beforeEach(function () {
    RemoveActModal = require('../../../src/scripts/components/RemoveActModal.js');
    component = React.createElement(RemoveActModal);
  });

  it('should create a new instance of RemoveActModal', function () {
    expect(component).toBeDefined();
  });
});
