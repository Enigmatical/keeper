'use strict';

describe('CharactersPage', function () {
  var React = require('react/addons');
  var CharactersPage, component;

  beforeEach(function () {
    CharactersPage = require('../../../src/scripts/components/CharactersPage.js');
    component = React.createElement(CharactersPage);
  });

  it('should create a new instance of CharactersPage', function () {
    expect(component).toBeDefined();
  });
});
