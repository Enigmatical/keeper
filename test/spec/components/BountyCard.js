'use strict';

describe('BountyCard', function () {
  var React = require('react/addons');
  var BountyCard, component;

  beforeEach(function () {
    BountyCard = require('../../../src/scripts/components/BountyCard.js');
    component = React.createElement(BountyCard);
  });

  it('should create a new instance of BountyCard', function () {
    expect(component).toBeDefined();
  });
});
