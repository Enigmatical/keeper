'use strict';

describe('TaskRemoveModal', function () {
  var React = require('react/addons');
  var TaskRemoveModal, component;

  beforeEach(function () {
    TaskRemoveModal = require('../../../src/scripts/components/TaskRemoveModal.js');
    component = React.createElement(TaskRemoveModal);
  });

  it('should create a new instance of TaskRemoveModal', function () {
    expect(component).toBeDefined();
  });
});
