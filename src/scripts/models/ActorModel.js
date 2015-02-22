'use strict';

var BaseModel = require('../models/BaseModel');



function ActorModel() {
    BaseModel.apply(this, ['actors']);

    this.name = 'actor';

    this.attrs = {
        parent_id: null,
        order: null,

        character_id: null,
        details: null,
        flavor: null
    };
}

ActorModel.prototype = new Object(BaseModel.prototype);

module.exports = ActorModel;