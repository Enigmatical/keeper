'use strict';

describe('AddCampaignButton', function () {
  var React = require('react/addons');
  var AddCampaignButton, component;

  beforeEach(function () {
    AddCampaignButton = require('../../../src/scripts/components/AddCampaignButton.js');
    component = React.createElement(AddCampaignButton);
  });

  it('should create a new instance of AddCampaignButton', function () {
    expect(component).toBeDefined();
  });
});
