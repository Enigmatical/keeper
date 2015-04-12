'use strict';

var React = require('react/addons');
var Markdown = require('markdown').markdown;
var _ = require('lodash');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Glyphicon = require('react-bootstrap').Glyphicon;

var EncounterFormModal = require('./FormModal');
var RemoveModal = require('../Model/RemoveModal');

require('../../../styles/ItemCard.css');



var EncounterCard = React.createClass({
    getObjective: function(data) {
        var objectiveTemplates = {
            travel: function(data) { return (
                <span>
                    <Glyphicon glyph="globe" />&nbsp;<small className="text-muted">Travel to</small> <strong>{data.details.area}</strong> <small className="text-muted">in</small> <strong>{data.details.location}</strong>
                </span>
                )},
            social: function(data) { return (
                <span>
                    <Glyphicon glyph="comment" />&nbsp;<small className="text-muted">Conversation with</small> <strong>{data.details.character}</strong>
                </span>
                )},
            skillCheck: function(data) { return(
                <span>
                    <Glyphicon glyph="eye-open" />&nbsp;<strong>{data.details.skill}</strong> <small className="text-muted">Check,</small> <strong>DC {data.details.skillDifficulty}</strong>
                </span>
                )},
            combat: function(data) { return(
                <span>
                    <Glyphicon glyph="warning-sign" />&nbsp;<small className="text-muted">Combat with</small> <strong>{data.details.battle}</strong>
                </span>
                )},
            mechanism: function(data) { return(
                <span>
                    <Glyphicon glyph="cog" />&nbsp;<small className="text-muted">Interact with</small> <strong>{data.details.name} ({_.startCase(data.details.mechanism)})</strong>
                </span>
                )},
            treasure: function(data) { return(
                <span>
                    <Glyphicon glyph="gift" />&nbsp;<strong>{data.details.name}</strong>
                </span>
                )},
            other: function(data) { return(
                <span>
                    <Glyphicon glyph="question-sign" />&nbsp;<strong>{data.details.name}</strong>
                </span>
                )}
        };

        return objectiveTemplates[data.type](data);
    },

    render: function () {
        var encounter = this.props.target;

        if (_.isObject(encounter)) {
            return (
                <div className="item-link-wrapper">
                    <div className="item-link">
                        <p className="pull-left">
                            {this.getObjective(encounter.attrs)}
                        </p>
                        <ButtonToolbar className="pull-right">
                            <EncounterFormModal link={true} target={encounter} parent={this.props.parent} campaign={this.props.campaign} onUpdate={this.props.onUpdate} />
                            <RemoveModal link={true} target={encounter} onUpdate={this.props.onUpdate} />
                        </ButtonToolbar>
                    </div>
                </div>
                );
        }
        else {
            return(<span />);
        }
    }
});

module.exports = EncounterCard;