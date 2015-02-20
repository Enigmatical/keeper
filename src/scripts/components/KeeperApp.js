'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Auth = require('../helpers/Auth');

var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var Nav = require('./Common/Nav');

/* CSS */
// Bootstrap
require('../../styles/vendor/normalize.css');
require('../../styles/vendor/bootstrap.min.css');
require('../../styles/vendor/bootstrap-theme.min.css');

// Main
require('../../styles/main.css');



var KeeperApp = React.createClass({
    render: function() {
        return (
            <div id="AppMain" ref="AppMain">
                <Nav />
                <div className="container-fluid">
                    <RouteHandler />
                </div>
            </div>
        );
    }
});

module.exports = KeeperApp;
