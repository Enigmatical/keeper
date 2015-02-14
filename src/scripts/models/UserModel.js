'use strict';

var Q = require('q');
var _ = require('lodash');

var BaseModel = require('../models/BaseModel');
var CampaignModel = require('../models/CampaignModel');



function UserModel() {
    BaseModel.apply(this, ['users']);

    this.attrs = {
        name: null,
        provider: null
    };

    this.getCampaigns = function() {
        return this.getRelated(CampaignModel, 'user_id', 'order');
    }
}

UserModel.prototype = new Object(BaseModel.prototype);


module.exports = UserModel;