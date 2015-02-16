'use strict';

describe('TaskFormModal', function () {
  var React = require('react/addons');
  var TaskFormModal, component;

  beforeEach(function () {
    TaskFormModal = require('../../../src/scripts/components/TaskFormModal.js');
    component = React.createElement(TaskFormModal);
  });

  it('should create a new instance of TaskFormModal', function () {
    expect(component).toBeDefined();
  });
});
