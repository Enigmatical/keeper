'use strict';

describe('AreaRemoveModal', function () {
  var React = require('react/addons');
  var AreaRemoveModal, component;

  beforeEach(function () {
    AreaRemoveModal = require('../../../src/scripts/components/AreaRemoveModal.js');
    component = React.createElement(AreaRemoveModal);
  });

  it('should create a new instance of AreaRemoveModal', function () {
    expect(component).toBeDefined();
  });
});
