'use strict';

var Q = require('q');

var Pathfinder = require('../helpers/Pathfinder');

var BaseModel = require('./BaseModel');

var BattlerModel = require('./BattlerModel');
var FoeModel = require('./FoeModel');



function BattleModel() {
    BaseModel.apply(this, ['battles']);

    this.name = 'battle';

    this.attrs = {
        parent_id: null,

        name: null,
        type: null,
        challenge: null,
        rewardXp: null,
        rewardCoin: null
    };

    this.getBattlers = function() {
        var self = this;
        var deferred = Q.defer();

        this.getRelated(BattlerModel, 'order')
            .done(function(battlers) {
                self.joinMany(FoeModel, battlers)
                    .done(function (battlers) {
                        deferred.resolve(battlers);
                    });
            });

        return deferred.promise;
    };

    this.updateAttributes = function() {
        var self = this;
        var deferred = Q.defer();

        self.getBattlers()
            .done(function(battlers) {
                var new_attrs = Pathfinder.getBattleAttrs(battlers);
                self.attrs = _.assign(self.attrs, new_attrs);

                self.save()
                    .done(function() {
                        deferred.resolve();
                    });
            });

        return deferred.promise;
    };
}

BattleModel.prototype = new Object(BaseModel.prototype);

module.exports = BattleModel;