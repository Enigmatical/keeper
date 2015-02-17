'use strict';

var BaseModel = require('../models/BaseModel');



function EncounterModel() {
    BaseModel.apply(this, ['areas']);

    this.attrs = {
        parent_id: null,
        order: null,

        type: null,
        details: null,
        flavor: null,
        challenge: null,
        rewardXp: null,
        rewardCoin: null,
        rewardOther: null
    };
}

EncounterModel.prototype = new Object(BaseModel.prototype);

module.exports = EncounterModel;