var Firebase = require("firebase");
var Q = require("q");



var Auth = {
    statics: {
        willTransitionTo: function(transition, params) {
            var isLoggedIn = Auth.isLoggedIn();
            if (!isLoggedIn) {
                transition.abort();
                Auth.login({transition: transition});
            }
        }
    },

    getRef: function() {
        return new Firebase("https://flickering-fire-7815.firebaseio.com");
    },

    getAuth: function() {
        var ref = this.getRef();
        return ref.getAuth();
    },

    isLoggedIn: function() {
        var ref = this.getRef();
        var auth = ref.getAuth();
        return auth ? true : false;
    },

    login: function(options) {
        Auth.handleLogin()
            .then(function(response) {
                Auth.onAuth(response.details);
                Auth.onChange();
                if (options.transition) {
                    options.transition.retry();
                }
            }, function() {
                Auth.onChange();
                if (options.transition) {
                    options.transition.redirect("home");
                }
            });
    },

    handleLogin: function() {
        var ref = this.getRef();
        var deferred = Q.defer();

        ref.authWithOAuthPopup("facebook", function(error, authData) {
            if (error) {
                deferred.reject( { status: "error", details: error } );
            }
            else {
                deferred.resolve( { status: "success", details: authData } );
            }
        });

        return deferred.promise;
    },

    logout: function() {
        var ref = this.getRef();
        ref.unauth();
        Auth.onChange();
    },

    onAuth: function(authData) {
        var ref = new Firebase("https://flickering-fire-7815.firebaseio.com");
        ref.child("users").child(authData.uid).set({
            uid: authData.uid,
            name: authData.facebook.displayName,
            provider: authData.provider
        });
    },

    onChange: function() {}
};

module.exports = Auth;
