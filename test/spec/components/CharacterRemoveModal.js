'use strict';

describe('CharacterRemoveModal', function () {
  var React = require('react/addons');
  var CharacterRemoveModal, component;

  beforeEach(function () {
    CharacterRemoveModal = require('../../../src/scripts/components/CharacterRemoveModal.js');
    component = React.createElement(CharacterRemoveModal);
  });

  it('should create a new instance of CharacterRemoveModal', function () {
    expect(component).toBeDefined();
  });
});
