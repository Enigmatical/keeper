'use strict';

var React = require('react/addons');

var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;



var CompleteAdventureButton = React.createClass({
    getInitialState: function() {
        return {
            checked: this.props.save.isComplete(this.props.target.id)
        }
    },

    handleComplete: function() {
        var self = this;
        var save = self.props.save;
        var target = self.props.target;
        var xp = target.attrs.rewardXp;

        save.toggleComplete(target.id, xp)
            .done(function(checked) {
                self.setState({checked: checked});

                if (_.isFunction(self.props.onComplete)) {
                    self.props.onComplete();
                }

                if (_.isFunction(self.props.onSave)) {
                    self.props.onSave();
                }
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