'use strict';

var BaseModel = require('../models/BaseModel');
var EncounterModel = require('../models/EncounterModel');



function TaskModel() {
    BaseModel.apply(this, ['tasks']);

    this.attrs = {
        quest_id: null,
        order: null,

        name: null,
        details: null,
        flavor: null
    };

    this.getEncounters = function() {
        return this.getRelated(EncounterModel, 'parent_id', 'order');
    }
}

TaskModel.prototype = new Object(BaseModel.prototype);

module.exports = TaskModel;