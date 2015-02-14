'use strict';

describe('ActRemoveModal', function () {
  var React = require('react/addons');
  var ActRemoveModal, component;

  beforeEach(function () {
    ActRemoveModal = require('../../../src/scripts/components/ActRemoveModal.js');
    component = React.createElement(ActRemoveModal);
  });

  it('should create a new instance of ActRemoveModal', function () {
    expect(component).toBeDefined();
  });
});
