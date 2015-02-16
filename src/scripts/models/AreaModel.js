'use strict';

var BaseModel = require('../models/BaseModel');



function AreaModel() {
    BaseModel.apply(this, ['areas']);

    this.attrs = {
        location_id: null,

        name: null,
        category: null,
        flavor: null,
        appearance: null,
        history: null
    };
}

AreaModel.prototype = new Object(BaseModel.prototype);

module.exports = AreaModel;