'use strict';

var React = require('react/addons');

var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;



var AdjustXpAdventureButton = React.createClass({
    handleXp: function(event) {
        var self = this;
        var button = event.target;
        var save = self.props.save;
        var xp = self.props.xp;

        button.setAttribute('disabled', 'disabled');
        save.adjustXp(xp);

        if (_.isFunction(this.props.onComplete)) {
            this.props.onComplete();
        }

        if (_.isFunction(this.props.onSave)) {
            this.props.onSave();
        }
    },

    render: function () {
        var xp = this.props.xp;

        return (
            <Button bsStyle="success" onClick={this.handleXp}><Glyphicon glyph="star" /> Reward +{xp} XP</Button>
            );
    }
});

module.exports = AdjustXpAdventureButton;