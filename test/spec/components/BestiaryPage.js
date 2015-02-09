'use strict';

describe('BestiaryPage', function () {
  var React = require('react/addons');
  var BestiaryPage, component;

  beforeEach(function () {
    BestiaryPage = require('../../../src/scripts/components/BestiaryPage.js');
    component = React.createElement(BestiaryPage);
  });

  it('should create a new instance of BestiaryPage', function () {
    expect(component).toBeDefined();
  });
});
