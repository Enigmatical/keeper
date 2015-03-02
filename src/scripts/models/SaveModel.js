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

    this.toggleComplete = function(id, xp) {
        if (xp === undefined) xp = 0;

        var deferred = Q.defer();
        var checked = this.isComplete(id);

        if (checked === true) {
            delete this.attrs.completed[id];
            this.attrs.xp = parseInt(this.attrs.xp) - parseInt(xp);
        }
        else {
            this.attrs.completed[id] = 1;
            this.attrs.xp = parseInt(this.attrs.xp) + parseInt(xp);
        }

        this.save()
            .done(function() {
                deferred.resolve(!checked);
            });

        return deferred.promise;
    };

    this.adjustXp = function(xp) {
        if (xp === undefined) xp = 0;

        var deferred = Q.defer();

        this.attrs.xp = parseInt(this.attrs.xp) + parseInt(xp);

        this.save()
            .done(function() {
                deferred.resolve();
            });

        return deferred.promise;
    };

    this.adjustTime = function(segs) {
        if (segs === undefined) segs = 0;

        var deferred = Q.defer();

        this.attrs.segs = parseInt(this.attrs.segs) + parseInt(segs);

        this.save()
            .done(function() {
                deferred.resolve();
            });

        return deferred.promise;
    };

    this.adjustLocation = function(location, coordinate, segs) {
        if (segs === undefined) segs = 0;

        var deferred = Q.defer();

        this.attrs.location_id = location;
        this.attrs.coordinate = coordinate;
        this.attrs.segs = parseInt(this.attrs.segs) + parseInt(segs);

        this.save()
            .done(function() {
                deferred.resolve();
            });

        return deferred.promise;
    };
}

SaveModel.prototype = new Object(BaseModel.prototype);

module.exports = SaveModel;