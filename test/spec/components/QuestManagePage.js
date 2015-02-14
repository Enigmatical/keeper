'use strict';

describe('QuestManagePage', function () {
  var React = require('react/addons');
  var QuestManagePage, component;

  beforeEach(function () {
    QuestManagePage = require('../../../src/scripts/components/QuestManagePage.js');
    component = React.createElement(QuestManagePage);
  });

  it('should create a new instance of QuestManagePage', function () {
    expect(component).toBeDefined();
  });
});
