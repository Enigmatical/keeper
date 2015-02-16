'use strict';

describe('ShopRemoveModal', function () {
  var React = require('react/addons');
  var ShopRemoveModal, component;

  beforeEach(function () {
    ShopRemoveModal = require('../../../src/scripts/components/ShopRemoveModal.js');
    component = React.createElement(ShopRemoveModal);
  });

  it('should create a new instance of ShopRemoveModal', function () {
    expect(component).toBeDefined();
  });
});
