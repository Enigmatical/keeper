'use strict';

var BaseModel = require('../models/BaseModel');



function CharacterModel() {
    BaseModel.apply(this, ['characters']);

    this.name = 'character';

    this.attrs = {
        parent_id: null,

        name: null,
        type: null,
        details: null,
        flavor: null
    };
}

CharacterModel.prototype = new Object(BaseModel.prototype);

module.exports = CharacterModel;