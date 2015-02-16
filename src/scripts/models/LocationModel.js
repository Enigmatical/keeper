'use strict';

var BaseModel = require('../models/BaseModel');
var AreaModel = require('../models/AreaModel');
var ShopModel = require('../models/ShopModel');



function LocationModel() {
    BaseModel.apply(this, ['locations']);

    this.attrs = {
        campaign_id: null,

        name: null,
        category: null,
        distance: null,
        flavor: null,
        appearance: null,
        history: null
    };

    this.getAreas = function() {
        return this.getRelated(AreaModel, 'location_id', 'name');
    };

    this.getShops = function() {
        return this.getRelated(ShopModel, 'location_id', 'name');
    };
}

LocationModel.prototype = new Object(BaseModel.prototype);

module.exports = LocationModel;