'use strict';

var BaseModel = require('../models/BaseModel');



function ShopModel() {
    BaseModel.apply(this, ['shops']);

    this.attrs = {
        location_id: null,

        name: null,
        type: null,
        category: null,
        shopkeeper: null,
        flavor: null,
        appearance: null,
        history: null
    };
}

ShopModel.prototype = new Object(BaseModel.prototype);

module.exports = ShopModel;