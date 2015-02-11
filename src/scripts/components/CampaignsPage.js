'use strict';

var React = require('react/addons');
var Auth = require('../helpers/Auth');
var UserModel = require('../models/UserModel');
var AddCampaignModal = require('./AddCampaignModal');

require('../../styles/CampaignsPage.css');



var CampaignsPage = React.createClass({
    mixins: [Auth],

    getInitialState: function() {
        return {'username': null}
    },

    handleUsername: function() {

        /*
        var newuser = new UserModel().create({
            name: 'Other Chris',
            provider: 'Fake Google',
            address: 'fake'
        }).save();

        console.log(newuser);
        */

        /*
        console.log(Auth.User);
        var user = new UserModel().create('Chris', 'Google');
        console.log(user);
        new UserModel().get(Auth.User.id).then(function(u) {
            console.log(u);
        });
        var newuser = new UserModel().create({
            name: 'Chris',
            provider: 'Google',
            address: 'fake'
        }).save();
        console.log(newuser);

        console.log(newuser.info());

        var self = this;
        var user;
        new UserModel().get(Auth.User.id).then(function(u) {
            user = u;
            self.setState({'username': user.props.name});
        });
        */
    },

    componentWillMount: function() {
        this.handleUsername();
    },

    render: function () {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1>Campaigns</h1>
                    <AddCampaignModal />
                </div>
            </div>
            );
    }
});

module.exports = CampaignsPage;


