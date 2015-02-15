'use strict';

var BaseModel = require('../models/BaseModel');
var QuestModel = require('../models/QuestModel');



function ActModel() {
    BaseModel.apply(this, ['acts']);

    this.attrs = {
        campaign_id: null,

        title: null,
        category: null,
        story: null,
        goal: null,
        order: null
    };

    this.getQuests = function() {
        return this.getRelated(QuestModel, 'act_id', 'order');
    }
}

ActModel.prototype = new Object(BaseModel.prototype);

module.exports = ActModel;