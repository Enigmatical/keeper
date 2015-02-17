'use strict';

describe('BattleRemoveModal', function () {
  var React = require('react/addons');
  var BattleRemoveModal, component;

  beforeEach(function () {
    BattleRemoveModal = require('../../../src/scripts/components/BattleRemoveModal.js');
    component = React.createElement(BattleRemoveModal);
  });

  it('should create a new instance of BattleRemoveModal', function () {
    expect(component).toBeDefined();
  });
});
