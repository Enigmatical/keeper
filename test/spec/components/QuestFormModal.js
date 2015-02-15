'use strict';

describe('QuestFormModal', function () {
  var React = require('react/addons');
  var QuestFormModal, component;

  beforeEach(function () {
    QuestFormModal = require('../../../src/scripts/components/QuestFormModal.js');
    component = React.createElement(QuestFormModal);
  });

  it('should create a new instance of QuestFormModal', function () {
    expect(component).toBeDefined();
  });
});
