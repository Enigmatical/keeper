'use strict';

var BaseModel = require('../models/BaseModel');



function PartyModel() {
    BaseModel.apply(this, ['parties']);

    this.name = 'party';

    this.attrs = {
        parent_id: null,

        name: null,
        details: null
    };
}

PartyModel.prototype = new Object(BaseModel.prototype);

module.exports = PartyModel;