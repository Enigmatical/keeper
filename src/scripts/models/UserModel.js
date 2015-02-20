'use strict';

var BaseModel = require('../models/BaseModel');
var CampaignModel = require('../models/CampaignModel');
var CharacterModel = require('../models/CharacterModel');
var FoeModel = require('../models/FoeModel');
var BattleModel = require('../models/BattleModel');



function UserModel() {
    BaseModel.apply(this, ['users']);

    this.name = 'user';

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

    this.getFoes = function() {
        return this.getRelated(FoeModel, 'user_id', 'name');
    };

    this.getBattles = function() {
        return this.getRelated(BattleModel, 'user_id', 'name');
    };
}

UserModel.prototype = new Object(BaseModel.prototype);

module.exports = UserModel;