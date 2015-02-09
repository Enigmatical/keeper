'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Auth = require('../helpers/Auth');

var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var MainNav = require('./MainNav');

// CSS
require('../../styles/normalize.css');
require('../../styles/bootstrap.min.css');
require('../../styles/bootstrap-theme.min.css');
require('../../styles/main.css');



var KeeperApp = React.createClass({
    render: function() {
        return (
            <div id="AppMain" ref="AppMain">
                <MainNav />
                <div className="container-fluid">
                    <RouteHandler />
                </div>
            </div>
        );
    }
});

module.exports = KeeperApp;
