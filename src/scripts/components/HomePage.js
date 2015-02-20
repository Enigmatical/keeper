'use strict';

var React = require('react/addons');

var Jumbotron = require('react-bootstrap').Jumbotron;



var HomePage = React.createClass({
    render: function () {
        return (
            <div className="row">
                <div className="col-md-12">
                    <Jumbotron>
                        <h1>Hello, GMs!</h1>
                        <h2>Welcome to <strong className="text-primary">Dungeon Keeper</strong></h2>
                        <br />
                        <p>Built for <em className="text-primary">Pathfinder</em> campaigns, this tool has been designed to help with organizing everything from <em className="text-primary">simple one-off adventures</em> to <em className="text-primary">epic, sweeping campaigns</em> allowing you to focus on what you do best - <strong className="text-primary">create</strong>.</p>
                    </Jumbotron>
                </div>
            </div>
            );
    }
});

module.exports = HomePage;


