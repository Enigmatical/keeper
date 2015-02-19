'use strict';

describe('CharacterLinkModal', function () {
  var React = require('react/addons');
  var CharacterLinkModal, component;

  beforeEach(function () {
    CharacterLinkModal = require('../../../src/scripts/components/CharacterLinkModal.js');
    component = React.createElement(CharacterLinkModal);
  });

  it('should create a new instance of CharacterLinkModal', function () {
    expect(component).toBeDefined();
  });
});
