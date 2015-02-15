'use strict';

describe('QuestRemoveModal', function () {
  var React = require('react/addons');
  var QuestRemoveModal, component;

  beforeEach(function () {
    QuestRemoveModal = require('../../../src/scripts/components/QuestRemoveModal.js');
    component = React.createElement(QuestRemoveModal);
  });

  it('should create a new instance of QuestRemoveModal', function () {
    expect(component).toBeDefined();
  });
});
