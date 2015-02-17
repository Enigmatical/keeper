'use strict';

var BaseModel = require('../models/BaseModel');



function CharacterModel() {
    BaseModel.apply(this, ['characters']);

    this.attrs = {
        user_id: null,

        name: null,
        type: null,
        details: null,
        flavor: null
    };
}

CharacterModel.prototype = new Object(BaseModel.prototype);

module.exports = CharacterModel;