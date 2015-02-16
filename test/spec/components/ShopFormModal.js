'use strict';

describe('ShopFormModal', function () {
  var React = require('react/addons');
  var ShopFormModal, component;

  beforeEach(function () {
    ShopFormModal = require('../../../src/scripts/components/ShopFormModal.js');
    component = React.createElement(ShopFormModal);
  });

  it('should create a new instance of ShopFormModal', function () {
    expect(component).toBeDefined();
  });
});
