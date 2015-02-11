'use strict';

var BaseModel = require('../models/BaseModel');



function CampaignModel() {
    BaseModel.apply(this, ['campaigns']);

    this.attrs = {
        name: null
    };
}

CampaignModel.prototype = new Object(BaseModel.prototype);

module.exports = CampaignModel;