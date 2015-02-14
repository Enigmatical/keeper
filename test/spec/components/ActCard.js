'use strict';

describe('ActCard', function () {
  var React = require('react/addons');
  var ActCard, component;

  beforeEach(function () {
    ActCard = require('../../../src/scripts/components/ActCard.js');
    component = React.createElement(ActCard);
  });

  it('should create a new instance of ActCard', function () {
    expect(component).toBeDefined();
  });
});
