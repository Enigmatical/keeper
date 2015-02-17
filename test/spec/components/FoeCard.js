'use strict';

describe('FoeCard', function () {
  var React = require('react/addons');
  var FoeCard, component;

  beforeEach(function () {
    FoeCard = require('../../../src/scripts/components/FoeCard.js');
    component = React.createElement(FoeCard);
  });

  it('should create a new instance of FoeCard', function () {
    expect(component).toBeDefined();
  });
});
