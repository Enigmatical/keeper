'use strict';

var Q = require('q');

var Pathfinder = require('../helpers/Pathfinder');

var BaseModel = require('../models/BaseModel');
var FoeModel = require('../models/FoeModel');



function BattleModel() {
    BaseModel.apply(this, ['battles']);

    this.name = 'group';

    this.attrs = {
        user_id: null,

        name: null,
        type: null,
        flavor: null,
        details: null,
        challenge: null,
        rewardXp: null,
        rewardCoin: null,

        foes: []
    };

    this.updateAttributes = function() {
        var self = this;
        var deferred = Q.defer();

        var new_attrs = Pathfinder.getBattleAttrs(self.attrs.foes);
        self.attrs = _.assign(self.attrs, new_attrs);

        self.save()
            .done(function() {
                deferred.resolve();
            });

        return deferred.promise;
    };

    this.linkModel = function(data) {
        var self = this;
        var deferred = Q.defer();

        new FoeModel().get(data.id)
            .done(function(link){
                data['attrs'] = link.attrs;
                self.attrs['foes'].push(data);

                self.updateAttributes()
                    .done(function() {
                        deferred.resolve();
                    });
            });

        return deferred.promise;
    };

    this.unlinkModel = function(index) {
        var self = this;
        var deferred = Q.defer();

        self.attrs.foes.splice(index, 1);
        self.updateAttributes()
            .done(function() {
                deferred.resolve();
            });

        return deferred.promise;
    };
}

BattleModel.prototype = new Object(BaseModel.prototype);

module.exports = BattleModel;