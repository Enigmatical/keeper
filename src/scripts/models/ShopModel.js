'use strict';

var Q = require('q');

var BaseModel = require('../models/BaseModel');
var CharacterModel = require('../models/CharacterModel');
var EncounterModel = require('../models/EncounterModel');



function ShopModel() {
    BaseModel.apply(this, ['shops']);

    this.attrs = {
        location_id: null,

        name: null,
        type: null,
        details: null,
        flavor: null,
        quality: null,

        shopkeepers: []
    };

    this.linkModel = function(data) {
        var self = this;
        var deferred = Q.defer();

        new CharacterModel().get(data.id)
            .done(function(link) {
                data['attrs'] = link.attrs;
                self.attrs['shopkeepers'].push(data);
                self.save()
                    .done(function() {
                        deferred.resolve();
                    });
            });

        return deferred.promise;
    };

    this.unlinkModel = function(index) {
        var self = this;
        var deferred = Q.defer();

        self.attrs.shopkeepers.splice(index, 1);
        self.save()
            .done(function() {
                deferred.resolve();
            });

        return deferred.promise;
    };

    this.getEncounters = function() {
        return this.getRelated(EncounterModel, 'parent_id', 'order');
    }
}

ShopModel.prototype = new Object(BaseModel.prototype);

module.exports = ShopModel;