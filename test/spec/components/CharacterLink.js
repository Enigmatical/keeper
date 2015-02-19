'use strict';

describe('CharacterLink', function () {
  var React = require('react/addons');
  var CharacterLink, component;

  beforeEach(function () {
    CharacterLink = require('../../../src/scripts/components/CharacterLink.js');
    component = React.createElement(CharacterLink);
  });

  it('should create a new instance of CharacterLink', function () {
    expect(component).toBeDefined();
  });
});
