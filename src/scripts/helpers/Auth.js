var Firebase = require("firebase");
var Q = require("q");

var UserModel = require('../models/UserModel');



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

    User: null,

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
        if (authData) {
            var User = new UserModel();
            User.id = authData.uid;
            User.props.name = authData.facebook.displayName;
            User.props.provider = authData.provider;

            User.set();
            Auth.User = User;
        }
    },

    onChange: function() {}
};

Auth.getRef().onAuth(Auth.onAuth); //Not a fan of this, could do a better job tying to Firebase.onAuth event, need something to set Auth.User

module.exports = Auth;
