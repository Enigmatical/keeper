'use strict';

describe('QuestCard', function () {
  var React = require('react/addons');
  var QuestCard, component;

  beforeEach(function () {
    QuestCard = require('../../../src/scripts/components/QuestCard.js');
    component = React.createElement(QuestCard);
  });

  it('should create a new instance of QuestCard', function () {
    expect(component).toBeDefined();
  });
});
