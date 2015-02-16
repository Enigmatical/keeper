'use strict';

describe('AreaCard', function () {
  var React = require('react/addons');
  var AreaCard, component;

  beforeEach(function () {
    AreaCard = require('../../../src/scripts/components/AreaCard.js');
    component = React.createElement(AreaCard);
  });

  it('should create a new instance of AreaCard', function () {
    expect(component).toBeDefined();
  });
});
