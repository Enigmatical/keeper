'use strict';

var Q = require('q');

var BaseModel = require('../models/BaseModel');
var QuestModel = require('../models/QuestModel');



function ActModel() {
    BaseModel.apply(this, ['acts']);

    this.name = 'act';

    this.attrs = {
        parent_id: null,
        order: null,

        name: null,
        type: null,
        details: null,
        flavor: null
    };

    this.getQuests = function() {
        return this.getRelated(QuestModel, 'order');
    };

    this.getProgress = function(save) {
        var self = this;
        var deferred = Q.defer();
        var completed = 0;

        this.getQuests()
            .done(function(quests) {
                var total = quests.length;

                _.each(quests, function(quest) {
                    if (save.isComplete(quest.id) === true) completed++;
                });

                self.progress = completed/total;
                deferred.resolve(self.progress);
            });

        return deferred.promise;
    };
}

ActModel.prototype = new Object(BaseModel.prototype);

module.exports = ActModel;