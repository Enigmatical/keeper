'use strict';

describe('CampaignBreadcrumb', function () {
  var React = require('react/addons');
  var CampaignBreadcrumb, component;

  beforeEach(function () {
    CampaignBreadcrumb = require('../../../src/scripts/components/CampaignBreadcrumb.js');
    component = React.createElement(CampaignBreadcrumb);
  });

  it('should create a new instance of CampaignBreadcrumb', function () {
    expect(component).toBeDefined();
  });
});
