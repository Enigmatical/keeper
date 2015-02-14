'use strict';

describe('ManageCampaignPage', function () {
  var React = require('react/addons');
  var ManageCampaignPage, component;

  beforeEach(function () {
    ManageCampaignPage = require('../../../src/scripts/components/ManageCampaignPage.js');
    component = React.createElement(ManageCampaignPage);
  });

  it('should create a new instance of ManageCampaignPage', function () {
    expect(component).toBeDefined();
  });
});
