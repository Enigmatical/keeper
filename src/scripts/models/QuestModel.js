'use strict';

var BaseModel = require('../models/BaseModel');
var TaskModel = require('../models/TaskModel');



function QuestModel() {
    BaseModel.apply(this, ['quests']);

    this.name = 'quest';

    this.attrs = {
        parent_id: null,
        order: null,

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

QuestModel.prototype = new Object(BaseModel.prototype);

module.exports = QuestModel;