'use strict';

describe('RemoveCampaignModal', function () {
  var React = require('react/addons');
  var RemoveCampaignModal, component;

  beforeEach(function () {
    RemoveCampaignModal = require('../../../src/scripts/components/RemoveCampaignModal.js');
    component = React.createElement(RemoveCampaignModal);
  });

  it('should create a new instance of RemoveCampaignModal', function () {
    expect(component).toBeDefined();
  });
});
