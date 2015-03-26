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

        var disable = self.props.disable !== undefined ? self.props.disable : true;

        if (disable) {
            button.setAttribute('disabled', 'disabled');
        }

        save.adjustTime(segs);

        if (_.isFunction(self.props.onComplete)) {
            self.props.onComplete();
        }

        if (_.isFunction(this.props.onSave)) {
            self.props.onSave();
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