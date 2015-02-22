'use strict';

var BaseModel = require('../models/BaseModel');



function BattlerModel() {
    BaseModel.apply(this, ['battlers']);

    this.name = 'battler';

    this.attrs = {
        parent_id: null,
        order: null,

        foe_id: null,
        type: null,
        count: null
    };
}

BattlerModel.prototype = new Object(BaseModel.prototype);

module.exports = BattlerModel;