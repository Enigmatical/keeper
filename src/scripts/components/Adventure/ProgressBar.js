'use strict';

var React = require('react/addons');

var ProgressBar = require('react-bootstrap').ProgressBar;



var ProgressAdventureBar = React.createClass({
    getInitialState: function() {
        return {
            progress: null
        }
    },

    componentWillMount: function() {
        var self = this;
        var target = self.props.target;
        var save = self.props.save;

        target.getProgress(save)
            .done(function(progress) {
                self.setState({progress: progress});
            });
    },

    render: function () {
        if (this.state.progress) {
            return (
                <ProgressBar className={this.props.className} striped bsStyle="success" now={parseInt(this.state.progress * 100)} />
                );
        }
        else {
            return (
                <ProgressBar className={this.props.className} striped bsStyle="success" now={0} />
                );
        }
    }
});

module.exports = ProgressAdventureBar;