'use strict';

var BaseModel = require('../models/BaseModel');
var TaskModel = require('../models/TaskModel');



function BountyModel() {
    BaseModel.apply(this, ['bounties']);

    this.attrs = {
        location_id: null,

        name: null,
        type: null,
        details: null,
        flavor: null,
        challenge: null,
        quality: null,
        rewardXp: null,
        rewardCoin: null,
        rewardOther: null
    };

    this.getTasks = function() {
        return this.getRelated(TaskModel, 'bounty_id', 'order');
    }
}

BountyModel.prototype = new Object(BaseModel.prototype);

module.exports = BountyModel;