'use strict';

describe('BattleFormModal', function () {
  var React = require('react/addons');
  var BattleFormModal, component;

  beforeEach(function () {
    BattleFormModal = require('../../../src/scripts/components/BattleFormModal.js');
    component = React.createElement(BattleFormModal);
  });

  it('should create a new instance of BattleFormModal', function () {
    expect(component).toBeDefined();
  });
});
