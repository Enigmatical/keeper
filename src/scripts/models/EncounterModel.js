'use strict';

var BaseModel = require('../models/BaseModel');



function EncounterModel() {
    BaseModel.apply(this, ['encounters']);

    this.name = 'encounter';

    this.attrs = {
        parent_id: null,
        order: null,

        name: null,
        type: null,
        details: null,
        flavor: null
    };
}

EncounterModel.prototype = new Object(BaseModel.prototype);

module.exports = EncounterModel;