'use strict';

var React = require('react/addons');
require('../../styles/HomePage.css');



var HomePage = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1>
                        Dungeon Keeper <small>version 0.1</small>
                    </h1>
                </div>
            </div>
            );
    }
});

module.exports = HomePage;


