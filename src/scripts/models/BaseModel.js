'use strict';

var Firebase = require('firebase');
var Q = require('q');



function BaseModel(args) {
    this.id = null;
    this.fb_ref = this.connect(args[0]);
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

BaseModel.prototype.info = function() {
    return this.attrs;
};

BaseModel.prototype.save = function() {
    var self = this;

    if (self.id) {
        this.set();
    }
    else {
        this.push();
    }

    return self;
};

BaseModel.prototype.set = function() {
    var self = this;
    if (self.id) {
        self.fb_ref.child(self.id).set(self.attrs, function(error) {
            if (error) {
                console.error('[Firebase] Write Failed: ' + error);
            }
        });
    } else {
        console.error('[Firebase] set() called with null this.id');
    }
};

BaseModel.prototype.push = function() {
    var self = this;
    var new_fb_ref = self.fb_ref.push(self.attrs, function(error) {
        if (error) {
            console.error('[Firebase] Write Failed: ' + error);
        }
        else {
            self.id = new_fb_ref.key();
        }
    });
};

BaseModel.prototype.get = function(id) {
    var self = this;
    var deferred = Q.defer();

    var handleQuery = function() {
        var deferred = Q.defer();

        self.fb_ref.child(id).once('value', function(snapshot) {
            return deferred.resolve(snapshot);
        }, function(errorObj) {
            return deferred.reject(errorObj);
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

            return deferred.resolve(self);
        }, function(errorObj) {
            console.error('[Firebase] Read Failed: ' + errorObj.code);
            return deferred.reject();
        });

    return deferred.promise;
};

module.exports = BaseModel;