'use strict';

describe('CampaignManagePage', function () {
  var React = require('react/addons');
  var CampaignManagePage, component;

  beforeEach(function () {
    CampaignManagePage = require('../../../src/scripts/components/CampaignManagePage.js');
    component = React.createElement(CampaignManagePage);
  });

  it('should create a new instance of CampaignManagePage', function () {
    expect(component).toBeDefined();
  });
});
