var Firebase = require('firebase');
var Q = require('q');



function UserModel() {
    this.fb_ref = new Firebase('https://flickering-fire-7815.firebaseio.com/users');

    this.id = null;
    this.props = {
        name: null,
        provider: null
    };
}

UserModel.prototype.set = function() {
    var self = this;

    self.fb_ref.child(self.id).set(self.props, function(error) {
        if (error) {
            console.error('[Firebase] User Write Failed: ' + error);
        }
    });

    return self;
};

UserModel.prototype.get = function(id) {
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
                self.props = data;
            }

            return deferred.resolve(self);
        }, function(errorObj) {
            console.error('[Firebase] User Read Failed: ' + errorObj.code);
            return deferred.reject();
        });

    return deferred.promise;
};

module.exports = UserModel;