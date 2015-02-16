'use strict';

var BaseModel = require('../models/BaseModel');
var EncounterModel = require('../models/EncounterModel');



function AreaModel() {
    BaseModel.apply(this, ['areas']);

    this.attrs = {
        location_id: null,

        name: null,
        type: null,
        details: null,
        flavor: null
    };

    this.getEncounters = function() {
        return this.getRelated(EncounterModel, 'parent_id', 'order');
    }
}

AreaModel.prototype = new Object(BaseModel.prototype);

module.exports = AreaModel;