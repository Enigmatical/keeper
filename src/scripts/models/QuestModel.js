'use strict';

var BaseModel = require('../models/BaseModel');
var TaskModel = require('../models/TaskModel');



function QuestModel() {
    BaseModel.apply(this, ['quests']);

    this.attrs = {
        act_id: null,
        order: null,

        name: null,
        type: null,
        details: null,
        flavor: null,
        rewardXp: null,
        rewardOther: null,
        challenge: null
    };

    this.getTasks = function() {
        return this.getRelated(TaskModel, 'quest_id', 'order');
    }
}

QuestModel.prototype = new Object(BaseModel.prototype);

module.exports = QuestModel;