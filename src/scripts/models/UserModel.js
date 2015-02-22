'use strict';

var Q = require('q');

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

    this.getCharacterOptions = function() {
        var self = this;
        var deferred = Q.defer();

        self.getCharacters()
            .done(function(characters) {
                var options = self.convertToOptions(characters, function(character) {
                    return character.attrs.name + ' (' + character.attrs.type + ')';
                });

                deferred.resolve(options);
            });

        return deferred.promise;
    };

    this.getFoes = function() {
        return this.getRelated(FoeModel, 'name');
    };

    this.getFoeOptions = function() {
        var self = this;
        var deferred = Q.defer();

        self.getFoes()
            .done(function(foes) {
                var options = self.convertToOptions(foes, function(foe) {
                    return foe.attrs.name + ', CR ' + foe.attrs.challenge + ' (Max ' + foe.attrs.count + ')';
                });

                deferred.resolve(options);
            });

        return deferred.promise;
    };

    this.getBattles = function() {
        return this.getRelated(BattleModel, 'name');
    };
}

UserModel.prototype = new Object(BaseModel.prototype);

module.exports = UserModel;