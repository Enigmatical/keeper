'use strict';

var Q = require('q');

var BaseModel = require('../models/BaseModel');
var ActModel = require('../models/ActModel');
var LocationModel = require('../models/LocationModel');



function CampaignModel() {
    BaseModel.apply(this, ['campaigns']);

    this.name = 'campaign';

    this.attrs = {
        parent_id: null,
        order: null,

        name: null,
        details: null,
        flavor: null
    };

    this.getActs = function() {
        return this.getRelated(ActModel, 'order');
    };

    this.getLocations = function() {
        return this.getRelated(LocationModel, 'name');
    };

    this.getLocationOptions = function() {
        var self = this;
        var deferred = Q.defer();

        self.getLocations()
            .done(function(locations) {
                var options = self.convertToOptions(locations, function(location) {
                    return location.attrs.name + ' (' + location.attrs.type + ')';
                });

                deferred.resolve(options);
            });

        return deferred.promise;
    };
}

CampaignModel.prototype = new Object(BaseModel.prototype);

module.exports = CampaignModel;