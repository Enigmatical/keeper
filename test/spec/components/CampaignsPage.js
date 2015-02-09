'use strict';

describe('CampaignsPage', function () {
  var React = require('react/addons');
  var CampaignsPage, component;

  beforeEach(function () {
    CampaignsPage = require('../../../src/scripts/components/CampaignsPage.js');
    component = React.createElement(CampaignsPage);
  });

  it('should create a new instance of CampaignsPage', function () {
    expect(component).toBeDefined();
  });
});
