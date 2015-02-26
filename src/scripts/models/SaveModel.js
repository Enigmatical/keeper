'use strict';

var BaseModel = require('./BaseModel');

var PartyModel = require('./PartyModel');



function SaveModel() {
    BaseModel.apply(this, ['saves']);

    this.name = 'save';

    this.attrs = {
        parent_id: null,

        party_id: null,
        location_id: null,
        segs: null,
        xp: null,
        notes: null,
        completed: []
    };

    this.getParty = function() {
        return this.joinOn(PartyModel, this);
    };
}

SaveModel.prototype = new Object(BaseModel.prototype);

module.exports = SaveModel;