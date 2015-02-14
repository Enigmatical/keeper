'use strict';

describe('CampaignCard', function () {
  var React = require('react/addons');
  var CampaignCard, component;

  beforeEach(function () {
    CampaignCard = require('../../../src/scripts/components/CampaignCard.js');
    component = React.createElement(CampaignCard);
  });

  it('should create a new instance of CampaignCard', function () {
    expect(component).toBeDefined();
  });
});
