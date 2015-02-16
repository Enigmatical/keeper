'use strict';

var BaseModel = require('../models/BaseModel');



function TaskModel() {
    BaseModel.apply(this, ['tasks']);

    this.attrs = {
        quest_id: null,

        objective: null,
        details: null,
        order: null
    };
}

TaskModel.prototype = new Object(BaseModel.prototype);

module.exports = TaskModel;