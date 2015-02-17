'use strict';

describe('CharacterManagePage', function () {
  var React = require('react/addons');
  var CharacterManagePage, component;

  beforeEach(function () {
    CharacterManagePage = require('../../../src/scripts/components/CharacterManagePage.js');
    component = React.createElement(CharacterManagePage);
  });

  it('should create a new instance of CharacterManagePage', function () {
    expect(component).toBeDefined();
  });
});
