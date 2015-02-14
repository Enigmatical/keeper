'use strict';

var Q = require('q');
var _ = require('lodash');

var BaseModel = require('../models/BaseModel');
var ActModel = require('../models/ActModel');


function CampaignModel() {
    BaseModel.apply(this, ['campaigns']);

    this.attrs = {
        user_id: null,

        title: null,
        subtitle: null,
        summary: null,
        order: null
    };

    this.getActs = function() {
        return this.getRelated(ActModel, 'campaign_id', 'order');
    }
}

CampaignModel.prototype = new Object(BaseModel.prototype);

module.exports = CampaignModel;