'use strict';

describe('CharacterFormModal', function () {
  var React = require('react/addons');
  var CharacterFormModal, component;

  beforeEach(function () {
    CharacterFormModal = require('../../../src/scripts/components/CharacterFormModal.js');
    component = React.createElement(CharacterFormModal);
  });

  it('should create a new instance of CharacterFormModal', function () {
    expect(component).toBeDefined();
  });
});
