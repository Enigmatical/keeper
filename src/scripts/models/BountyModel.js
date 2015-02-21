'use strict';

var BaseModel = require('../models/BaseModel');
var TaskModel = require('../models/TaskModel');



function BountyModel() {
    BaseModel.apply(this, ['bounties']);

    this.name = 'bounty';

    this.attrs = {
        parent_id: null,

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
        return this.getRelated(TaskModel, 'order');
    }
}

BountyModel.prototype = new Object(BaseModel.prototype);

module.exports = BountyModel;