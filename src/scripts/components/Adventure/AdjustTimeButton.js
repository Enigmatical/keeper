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

        if (!self.props.disable === false) {
            button.setAttribute('disabled', 'disabled');
        }

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
        var label = (<span><Glyphicon glyph="calendar" /> Time + {Pathfinder.getAdjustTimeLabel(segs)}</span>);

        if (this.props.children) label = this.props.children;

        return (
            <Button bsStyle="warning" onClick={this.handleTime} block={this.props.block}>{label}</Button>
            );
    }
});

module.exports = AdjustTimeAdventureButton;