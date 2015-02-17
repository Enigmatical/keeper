'use strict';

describe('BattleCard', function () {
  var React = require('react/addons');
  var BattleCard, component;

  beforeEach(function () {
    BattleCard = require('../../../src/scripts/components/BattleCard.js');
    component = React.createElement(BattleCard);
  });

  it('should create a new instance of BattleCard', function () {
    expect(component).toBeDefined();
  });
});
