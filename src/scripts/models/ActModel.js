'use strict';

var BaseModel = require('../models/BaseModel');
var QuestModel = require('../models/QuestModel');



function ActModel() {
    BaseModel.apply(this, ['acts']);

    this.name = 'act';

    this.attrs = {
        parent_id: null,
        order: null,

        name: null,
        type: null,
        details: null,
        flavor: null
    };

    this.getQuests = function() {
        return this.getRelated(QuestModel, 'order');
    }
}

ActModel.prototype = new Object(BaseModel.prototype);

module.exports = ActModel;