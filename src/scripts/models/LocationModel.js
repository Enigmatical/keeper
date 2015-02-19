'use strict';

var BaseModel = require('../models/BaseModel');
var AreaModel = require('../models/AreaModel');
var ShopModel = require('../models/ShopModel');
var BountyModel = require('../models/BountyModel');



function LocationModel() {
    BaseModel.apply(this, ['locations']);

    this.attrs = {
        campaign_id: null,

        name: null,
        type: null,
        details: null,
        flavor: null,
        coordinate: null
    };

    this.getAreas = function() {
        return this.getRelated(AreaModel, 'location_id', 'name');
    };

    this.getShops = function() {
        return this.getRelated(ShopModel, 'location_id', 'name');
    };

    this.getBounties = function() {
        return this.getRelated(BountyModel, 'location_id', 'rewardXp');
    };
}

LocationModel.prototype = new Object(BaseModel.prototype);

module.exports = LocationModel;