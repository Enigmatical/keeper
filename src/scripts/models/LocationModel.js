'use strict';

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

    this.getShops = function() {
        return this.getRelated(ShopModel, 'name');
    };

    this.getBounties = function() {
        return this.getRelated(BountyModel, 'rewardXp');
    };
}

LocationModel.prototype = new Object(BaseModel.prototype);

module.exports = LocationModel;