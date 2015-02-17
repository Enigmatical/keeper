'use strict';

var BaseModel = require('../models/BaseModel');
var CampaignModel = require('../models/CampaignModel');
var CharacterModel = require('../models/CharacterModel');



function UserModel() {
    BaseModel.apply(this, ['users']);

    this.attrs = {
        name: null,
        provider: null
    };

    this.getCampaigns = function() {
        return this.getRelated(CampaignModel, 'user_id', 'order');
    };

    this.getCharacters = function() {
        return this.getRelated(CharacterModel, 'user_id', 'name');
    };
}

UserModel.prototype = new Object(BaseModel.prototype);

module.exports = UserModel;