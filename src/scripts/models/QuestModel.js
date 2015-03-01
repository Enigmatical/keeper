'use strict';

var Q = require('q');

var BaseModel = require('../models/BaseModel');
var TaskModel = require('../models/TaskModel');



function QuestModel() {
    BaseModel.apply(this, ['quests']);

    this.name = 'quest';

    this.attrs = {
        parent_id: null,
        order: null,

        name: null,
        type: null,
        details: null,
        flavor: null,
        challenge: null,
        quality: null,
        rewardXp: null,
        rewardCoin: null,
        rewardOther: null
    };

    this.getTasks = function() {
        return this.getRelated(TaskModel, 'order');
    };

    this.getProgress = function(save) {
        var self = this;
        var deferred = Q.defer();
        var completed = 0;

        this.getTasks()
            .done(function(tasks) {
                _.each(tasks, function(task) {
                    var total = tasks.length;
                    if (save.isComplete(task.id) === true) completed++;
                    self.progress = completed/total;
                    deferred.resolve(completed/total);
                });
            });

        return deferred.promise;
    };
}

QuestModel.prototype = new Object(BaseModel.prototype);

module.exports = QuestModel;