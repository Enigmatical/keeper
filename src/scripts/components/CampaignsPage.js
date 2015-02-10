'use strict';

var React = require('react/addons');
var Auth = require('../helpers/Auth');
var UserModel = require('../models/UserModel');

require('../../styles/CampaignsPage.css');



var CampaignsPage = React.createClass({
    mixins: [Auth],

    /*
    getInitialState: function() {
        return {'username': null}
    },

    handleUsername: function() {
        var self = this;
        var user;
        new UserModel().get(Auth.User.id).then(function(u) {
            user = u;
            self.setState({'username': user.props.name});
        });
    },

    componentWillMount: function() {
        this.handleUsername();
    },
    */

    render: function () {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1>Campaigns</h1>
                </div>
            </div>
            );
    }
});

module.exports = CampaignsPage;


