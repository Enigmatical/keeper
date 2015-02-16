'use strict';

describe('ShopCard', function () {
  var React = require('react/addons');
  var ShopCard, component;

  beforeEach(function () {
    ShopCard = require('../../../src/scripts/components/ShopCard.js');
    component = React.createElement(ShopCard);
  });

  it('should create a new instance of ShopCard', function () {
    expect(component).toBeDefined();
  });
});
