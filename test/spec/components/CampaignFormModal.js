'use strict';

describe('CampaignFormModal', function () {
  var React = require('react/addons');
  var CampaignFormModal, component;

  beforeEach(function () {
    CampaignFormModal = require('../../../src/scripts/components/CampaignFormModal.js');
    component = React.createElement(CampaignFormModal);
  });

  it('should create a new instance of CampaignFormModal', function () {
    expect(component).toBeDefined();
  });
});
