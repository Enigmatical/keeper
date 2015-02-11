'use strict';

var BaseModel = require('../models/BaseModel');



function UserCampaignModel() {
    BaseModel.apply(this, ['user_campaigns']);

    this.attrs = {
        user: null,
        campaign: null
    };
}

UserCampaignModel.prototype = new Object(BaseModel.prototype);

module.exports = UserCampaignModel;