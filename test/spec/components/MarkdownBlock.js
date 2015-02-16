'use strict';

describe('MarkdownBlock', function () {
  var React = require('react/addons');
  var MarkdownBlock, component;

  beforeEach(function () {
    MarkdownBlock = require('../../../src/scripts/components/MarkdownBlock.js');
    component = React.createElement(MarkdownBlock);
  });

  it('should create a new instance of MarkdownBlock', function () {
    expect(component).toBeDefined();
  });
});
