'use strict';

var Q = require('q');

var BaseModel = require('./BaseModel');

var ActorModel = require('./ActorModel');
var CharacterModel = require('./CharacterModel');

var EncounterModel = require('./EncounterModel');


function ShopModel() {
    BaseModel.apply(this, ['shops']);

    this.name = 'shop';

    this.attrs = {
        parent_id: null,

        name: null,
        type: null,
        details: null,
        flavor: null,
        quality: null
    };

    this.getActors = function() {
        var self = this;
        var deferred = Q.defer();

        this.getRelated(ActorModel, 'order')
            .done(function(actors) {
                self.joinMany(CharacterModel, actors)
                    .done(function(actors) {
                        deferred.resolve(actors);
                    });
            });

        return deferred.promise;
    };

    this.getEncounters = function() {
        return this.getRelated(EncounterModel, 'order');
    };
}

ShopModel.prototype = new Object(BaseModel.prototype);

module.exports = ShopModel;