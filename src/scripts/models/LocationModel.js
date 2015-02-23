'use strict';

var Q = require('q');

var BaseModel = require('../models/BaseModel');
var AreaModel = require('../models/AreaModel');
var ShopModel = require('../models/ShopModel');
var BountyModel = require('../models/BountyModel');



function LocationModel() {
    BaseModel.apply(this, ['locations']);

    this.name = 'location';

    this.attrs = {
        parent_id: null,

        name: null,
        type: null,
        details: null,
        flavor: null,
        coordinate: null
    };

    this.getAreas = function() {
        return this.getRelated(AreaModel, 'name');
    };

    this.getAreaOptions = function() {
        var self = this;
        var deferred = Q.defer();

        self.getAreas()
            .done(function(areas) {
                var options = self.convertToOptions(areas, function(area) {
                    return area.attrs.name;
                });

                deferred.resolve(options);
            });

        return deferred.promise;
    };

    this.getShops = function() {
        return this.getRelated(ShopModel, 'name');
    };

    this.getShopOptions = function() {
        var self = this;
        var deferred = Q.defer();

        self.getShops()
            .done(function(shops) {
                var options = self.convertToOptions(shops, function(shop) {
                    return shop.attrs.name;
                });

                deferred.resolve(options);
            });

        return deferred.promise;
    };

    this.getBounties = function() {
        return this.getRelated(BountyModel, 'rewardXp');
    };

    this.getAllAreaOptions = function() {
        var self = this;
        var deferred = Q.defer();
        var options = [];

        Q.allSettled([self.getAreas(), self.getShops()])
            .spread(function(areas, shops) {
                _.each(areas.value, function(area) {
                    options.push({label: area.attrs.name + ' (Area)', value: area.attrs.name + ' (Area)'});
                });

                _.each(shops.value, function(shop) {
                    options.push({label: shop.attrs.name + ' (Shop)', value: shop.attrs.name + ' (Shop)'});
                });

                options = options.sort(function(a, b) {
                    if (a.label < b.label) return -1;
                    if (a.label > b.label) return 1;
                    return 0;
                });

                deferred.resolve(options);
            });

        return deferred.promise;
    };
}

LocationModel.prototype = new Object(BaseModel.prototype);

module.exports = LocationModel;