'use strict';

var React = require('react/addons');
var Router = require('react-router');

var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;



var CompleteAdventureButton = React.createClass({
    getInitialState: function() {
        return {
            save: null,
            checked: this.props.save.isComplete(this.props.target.id)
        }
    },

    handleComplete: function() {
        var self = this;
        var save = self.props.save;
        var target = self.props.target;

        save.toggleComplete(target.id)
            .done(function(checked) {
                self.setState({checked: checked});
            });
    },

    render: function () {
        if (this.state.checked === true) {
            return (
                <Button bsStyle="success" onClick={this.handleComplete}><Glyphicon glyph="check" /> Complete</Button>
                );
        }
        else {
            return (
                <Button bsStyle="warning" onClick={this.handleComplete}><Glyphicon glyph="unchecked" /> Incomplete</Button>
                );
        }
    }
});

module.exports = CompleteAdventureButton;