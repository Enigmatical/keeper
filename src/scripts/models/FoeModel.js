'use strict';

var BaseModel = require('../models/BaseModel');



function FoeModel() {
    BaseModel.apply(this, ['foes']);

    this.attrs = {
        user_id: null,

        name: null,
        type: null,
        challenge: null,
        flavor: null,
        quick: null,
        details: null,
        rewardXp: null,
        rewardCoin: null,
        onHand: null,
        page: null
    };
}

FoeModel.prototype = new Object(BaseModel.prototype);

module.exports = FoeModel;