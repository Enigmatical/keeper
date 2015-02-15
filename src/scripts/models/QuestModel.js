'use strict';

var BaseModel = require('../models/BaseModel');



function QuestModel() {
    BaseModel.apply(this, ['quests']);

    this.attrs = {
        act_id: null,

        title: null,
        story: null,
        goal: null,
        order: null
    };
}

QuestModel.prototype = new Object(BaseModel.prototype);

module.exports = QuestModel;