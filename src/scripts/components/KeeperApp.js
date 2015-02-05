'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

// CSS
require('../../styles/normalize.css');
require('../../styles/bootstrap.min.css');
require('../../styles/bootstrap-theme.min.css');
require('../../styles/main.css');

var KeeperApp = React.createClass({
    render: function() {
        return (
            <div className='main'></div>
        );
    }
});

module.exports = KeeperApp;
