'use strict';

describe('TaskManagePage', function () {
  var React = require('react/addons');
  var TaskManagePage, component;

  beforeEach(function () {
    TaskManagePage = require('../../../src/scripts/components/TaskManagePage.js');
    component = React.createElement(TaskManagePage);
  });

  it('should create a new instance of TaskManagePage', function () {
    expect(component).toBeDefined();
  });
});
