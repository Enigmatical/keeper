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
        completed: {}
    };

    this.getParty = function () {
        return this.joinOn(PartyModel, this);
    };

    this.getLocation = function () {
        return this.joinOn(LocationModel, this);
    };

    this.getJoins = function () {
        var self = this;

        return Q.allSettled([self.getParty(), self.getLocation()]);
    };

    this.isComplete = function (id) {
        if (this.attrs.completed === undefined) this.attrs.completed = {};

        return (this.attrs.completed.hasOwnProperty(id));
    };

    this.toggleComplete = function(id) {
        var deferred = Q.defer();
        var checked = this.isComplete(id);

        if (checked === true) {
            delete this.attrs.completed[id];
        }
        else {
            this.attrs.completed[id] = 1;
        }

        console.log(this.attrs);

        this.save()
            .done(function() {
                deferred.resolve(!checked);
            });

        return deferred.promise;
    };
}

SaveModel.prototype = new Object(BaseModel.prototype);

module.exports = SaveModel;