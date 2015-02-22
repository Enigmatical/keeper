'use strict';

var BaseModel = require('../models/BaseModel');



function FoeModel() {
    BaseModel.apply(this, ['foes']);

    this.name = 'foe';

    this.attrs = {
        parent_id: null,

        name: null,
        type: null,
        challenge: null,
        flavor: null,
        quick: null,
        details: null,
        quality: null,
        rewardXp: null,
        rewardCoin: null,
        count: null,
        page: null
    };
}

FoeModel.prototype = new Object(BaseModel.prototype);

module.exports = FoeModel;