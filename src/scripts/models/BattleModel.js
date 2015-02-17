'use strict';

var BaseModel = require('../models/BaseModel');



function BattleModel() {
    BaseModel.apply(this, ['battles']);

    this.attrs = {
        user_id: null,

        name: null,
        type: null,
        foes: null,
        flavor: null,
        details: null,
        challenge: null,
        rewardXp: null,
        rewardCoin: null
    };
}

BattleModel.prototype = new Object(BaseModel.prototype);

module.exports = BattleModel;