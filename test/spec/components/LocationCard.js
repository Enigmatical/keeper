'use strict';

describe('LocationCard', function () {
  var React = require('react/addons');
  var LocationCard, component;

  beforeEach(function () {
    LocationCard = require('../../../src/scripts/components/LocationCard.js');
    component = React.createElement(LocationCard);
  });

  it('should create a new instance of LocationCard', function () {
    expect(component).toBeDefined();
  });
});
