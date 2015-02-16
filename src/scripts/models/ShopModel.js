'use strict';

var BaseModel = require('../models/BaseModel');
var EncounterModel = require('../models/EncounterModel');



function ShopModel() {
    BaseModel.apply(this, ['shops']);

    this.attrs = {
        location_id: null,

        name: null,
        type: null,
        details: null,
        flavor: null,
        shopkeeper: null,
        quality: null
    };

    this.getEncounters = function() {
        return this.getRelated(EncounterModel, 'parent_id', 'order');
    }
}

ShopModel.prototype = new Object(BaseModel.prototype);

module.exports = ShopModel;