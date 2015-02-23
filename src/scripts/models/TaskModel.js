'use strict';

var BaseModel = require('./BaseModel');
var EncounterModel = require('./EncounterModel');



function TaskModel() {
    BaseModel.apply(this, ['tasks']);

    this.name = 'task';

    this.attrs = {
        parent_id: null,
        order: null,

        name: null,
        details: null,
        flavor: null
    };

    this.getEncounters = function() {
        return this.getRelated(EncounterModel, 'order');
    }
}

TaskModel.prototype = new Object(BaseModel.prototype);

module.exports = TaskModel;