'use strict';

describe('AddCampaignModal', function () {
  var React = require('react/addons');
  var AddCampaignModal, component;

  beforeEach(function () {
    AddCampaignModal = require('../../../src/scripts/components/AddCampaignModal.js');
    component = React.createElement(AddCampaignModal);
  });

  it('should create a new instance of AddCampaignModal', function () {
    expect(component).toBeDefined();
  });
});
