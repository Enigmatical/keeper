'use strict';

var Q = require('q');

var BaseModel = require('./BaseModel');

var PartyModel = require('./PartyModel');
var LocationModel = require('./LocationModel');



function SaveModel() {
    BaseModel.apply(this, ['saves']);

    this.name = 'save';

    this.attrs = {
        parent_id: null,

        party_id: null,
        location_id: null,
        coordinate: null,
        segs: null,
        xp: null,
        notes: null,
        completed: []
    };

    this.getParty = function() {
        return this.joinOn(PartyModel, this);
    };

    this.getLocation = function() {
        return this.joinOn(LocationModel, this);
    };

    this.getJoins = function() {
        var self = this;

        return Q.allSettled([self.getParty(), self.getLocation()]);
    };
}

SaveModel.prototype = new Object(BaseModel.prototype);

module.exports = SaveModel;