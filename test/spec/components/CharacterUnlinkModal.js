'use strict';

describe('CharacterUnlinkModal', function () {
  var React = require('react/addons');
  var CharacterUnlinkModal, component;

  beforeEach(function () {
    CharacterUnlinkModal = require('../../../src/scripts/components/CharacterUnlinkModal.js');
    component = React.createElement(CharacterUnlinkModal);
  });

  it('should create a new instance of CharacterUnlinkModal', function () {
    expect(component).toBeDefined();
  });
});
