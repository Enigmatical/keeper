'use strict';

describe('CharacterCard', function () {
  var React = require('react/addons');
  var CharacterCard, component;

  beforeEach(function () {
    CharacterCard = require('../../../src/scripts/components/CharacterCard.js');
    component = React.createElement(CharacterCard);
  });

  it('should create a new instance of CharacterCard', function () {
    expect(component).toBeDefined();
  });
});
