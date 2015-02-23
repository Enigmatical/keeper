'use strict';

var Firebase = require('firebase');
var Q = require('q');
var _ = require('lodash');



function BaseModel(args) {
    this.id = null;
    this.name = 'base';

    this.fb_ref = this.connect(args);
}

BaseModel.prototype.connect = function(ref) {
    return new Firebase('https://flickering-fire-7815.firebaseio.com/' + ref);
};

BaseModel.prototype.create = function(attributes) {
    for (var key in attributes) {
        if (key in this.attrs) {
            this.attrs[key] = attributes[key];
        }
    }

    return this;
};

BaseModel.prototype.merge = function(attributes) {
    this.attrs = _.assign(this.attrs, attributes);

    return this;
};

BaseModel.prototype.info = function() {
    return this.attrs;
};

BaseModel.prototype.save = function() {
    var self = this;
    var deferred = Q.defer();

    if (self.id) {
        self.set(deferred);
    }
    else {
        self.push(deferred);
    }

    return deferred.promise;
};

BaseModel.prototype.set = function(deferred) {
    if (deferred === undefined) {
        deferred = Q.defer();
    }

    var self = this;
    if (self.id) {
        self.fb_ref.child(self.id).set(self.attrs, function(error) {
            if (error) {
                console.error('[Firebase] Write Failed: ' + error);
                deferred.reject(error);
            }
            else {
                deferred.resolve(self);
            }
        });
    } else {
        console.error('[Firebase] set() called with null this.id');
        deferred.reject();
    }

    return deferred.promise;
};

BaseModel.prototype.push = function(deferred) {
    if (deferred === undefined) {
        deferred = Q.defer();
    }

    var self = this;
    var new_fb_ref = self.fb_ref.push(self.attrs, function(error) {
        if (error) {
            console.error('[Firebase] Write Failed: ' + error);
            deferred.reject(error);
        }
        else {
            self.id = new_fb_ref.key();
            deferred.resolve(self);
        }
    });

    return deferred.promise;
};

BaseModel.prototype.get = function(id) {
    var self = this;
    var deferred = Q.defer();

    var handleQuery = function() {
        var deferred = Q.defer();

        self.fb_ref.child(id).once('value', function(snapshot) {
            deferred.resolve(snapshot);
        }, function(errorObj) {
            deferred.reject(errorObj);
        });

        return deferred.promise;
    };

    handleQuery()
        .then(function(snapshot) {
            var data = snapshot.val();
            if (data !== null) {
                self.id = id;
                self.attrs = data;
            }

            deferred.resolve(self);
        }, function(errorObj) {
            console.error('[Firebase] Read Failed: ' + errorObj.code);
            deferred.reject();
        });

    return deferred.promise;
};

BaseModel.prototype.getRelated = function(RelatedModel, sort_key) {
    var deferred = Q.defer();

    var self = this;

    new RelatedModel().fb_ref
        .orderByChild('parent_id')
        .equalTo(self.id)
        .once('value', function(snapshot) {
            if (snapshot !== null) {
                var records = [];
                snapshot.forEach(function(child) {
                    var record = new RelatedModel().create(child.val());
                    record.id = child.key();
                    records.push(record);
                });
                self.sortModels(records, sort_key);
                deferred.resolve(records);
            }
            else {
                deferred.reject();
            }
        });

    return deferred.promise;
};

BaseModel.prototype.joinOn = function(JoinModel, record) {
    var deferred = Q.defer();
    var modelName = new JoinModel().name.toLowerCase();
    var joinKey = modelName + '_id';

    if (!_.isEmpty(record.attrs[joinKey])) {
        new JoinModel().get(record.attrs[joinKey])
            .done(function(join) {
                record[modelName] = join;
                deferred.resolve(record);
            });
    }
    else {
        deferred.reject();
    }

    return deferred.promise;
};

BaseModel.prototype.joinMany = function(JoinModel, records) {
    var self = this;
    var deferred = Q.defer();
    var promises = [];

    _.each(records, function(record) {
        promises.push(self.joinOn(JoinModel, record));
    });

    Q.allSettled(promises)
        .done(function() {
            deferred.resolve(records);
        });

    return deferred.promise;
};

BaseModel.prototype.remove = function() {
    var self = this;
    var deferred = Q.defer();

    self.fb_ref.child(self.id).remove(function(error) {
        if (error) {
            console.error('[Firebase] Remove Failed: ' + error);
            deferred.reject();
        }
        else {
            deferred.resolve();
        }
    });

    return deferred.promise;
};

BaseModel.prototype.sortModels = function(array, key) {
    var compare = function(a, b) {
        var a_val = a.attrs[key];
        var b_val = b.attrs[key];

        if (_.isNumber(parseInt(a_val)) && _.isNumber(parseInt(b_val))) {
            a_val = parseInt(a_val);
            b_val = parseInt(b_val);
        }

        if (a_val < b_val) {
            return -1;
        }
        if (a_val > b_val) {
            return 1;
        }
        return 0;
    };

    array = array.sort(compare);

    return array;
};

BaseModel.prototype.convertToOptions = function(array, buildLabel) {
    var options = [];

    _.each(array, function(item) {
        var label = buildLabel(item);
        var option = {
            label: label,
            value: item.id
        };
        options.push(option);
    });

    return options;
};

module.exports = BaseModel;