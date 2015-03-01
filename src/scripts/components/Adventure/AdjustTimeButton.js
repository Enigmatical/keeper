'use strict';

var React = require('react/addons');

var Pathfinder = require('../../helpers/Pathfinder');

var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;



var AdjustTimeAdventureButton = React.createClass({
    handleTime: function(event) {
        var self = this;
        var button = event.target;
        var save = self.props.save;
        var segs = self.props.segs;

        button.setAttribute('disabled', 'disabled');
        save.adjustTime(segs);

        if (_.isFunction(this.props.onComplete)) {
            this.props.onComplete();
        }

        if (_.isFunction(this.props.onSave)) {
            this.props.onSave();
        }
    },

    render: function () {
        var segs = this.props.segs;
        var label = Pathfinder.getAdjustTimeLabel(segs);

        return (
            <Button bsStyle="warning" onClick={this.handleTime}><Glyphicon glyph="calendar" /> Time +{label}</Button>
            );
    }
});

module.exports = AdjustTimeAdventureButton;