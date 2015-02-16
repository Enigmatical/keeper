'use strict';

describe('AreaFormModal', function () {
  var React = require('react/addons');
  var AreaFormModal, component;

  beforeEach(function () {
    AreaFormModal = require('../../../src/scripts/components/AreaFormModal.js');
    component = React.createElement(AreaFormModal);
  });

  it('should create a new instance of AreaFormModal', function () {
    expect(component).toBeDefined();
  });
});
