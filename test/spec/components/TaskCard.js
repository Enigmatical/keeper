'use strict';

describe('TaskCard', function () {
  var React = require('react/addons');
  var TaskCard, component;

  beforeEach(function () {
    TaskCard = require('../../../src/scripts/components/TaskCard.js');
    component = React.createElement(TaskCard);
  });

  it('should create a new instance of TaskCard', function () {
    expect(component).toBeDefined();
  });
});
