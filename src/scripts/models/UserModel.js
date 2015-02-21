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
        return this.getRelated(CampaignModel, 'order');
    };

    this.getCharacters = function() {
        return this.getRelated(CharacterModel, 'name');
    };

    this.getFoes = function() {
        return this.getRelated(FoeModel, 'name');
    };

    this.getBattles = function() {
        return this.getRelated(BattleModel, 'name');
    };
}

UserModel.prototype = new Object(BaseModel.prototype);

module.exports = UserModel;