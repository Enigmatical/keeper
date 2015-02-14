'use strict';

describe('CampaignRemoveModal', function () {
  var React = require('react/addons');
  var CampaignRemoveModal, component;

  beforeEach(function () {
    CampaignRemoveModal = require('../../../src/scripts/components/CampaignRemoveModal.js');
    component = React.createElement(CampaignRemoveModal);
  });

  it('should create a new instance of CampaignRemoveModal', function () {
    expect(component).toBeDefined();
  });
});
