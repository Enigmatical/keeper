'use strict';

var React = require('react/addons');
var Markdown = require('markdown').markdown;
var _ = require('lodash');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;

var EncounterFormModal = require('./FormModal');
var RemoveModal = require('../Model/RemoveModal');

require('../../../styles/ItemCard.css');



var EncounterCard = React.createClass({
    getObjective: function(data) {
        var objectiveTemplates = {
            travel: function(data) { return (
                <span>
                    <small class="text-muted">Travel to</small> <strong>{data.details.area}</strong> <small class="text-muted">in</small> <strong>{data.details.location}</strong>
                </span>
                )},
            social: function(data) { return (
                <span>
                    <small class="text-muted">Conversation with</small> <strong>{data.details.character}</strong>
                </span>
                )},
            skillCheck: function(data) { return(
                <span>
                    <strong>{data.details.skill}</strong> <small class="text-muted">Check,</small> <strong>DC {data.details.skillDifficulty}</strong>
                </span>
                )},
            combat: function(data) { return(
                <span>
                    <small class="text-muted">Combat with</small> <strong>{data.details.battle}</strong>
                </span>
                )},
            mechanism: function(data) { return(
                <span>
                    <small class="text-muted">Interact with</small> <strong>{data.details.name} ({_.startCase(data.details.mechanism)})</strong>
                </span>
                )},
            other: function(data) { return(
                <span>
                    <strong>{data.details.name}</strong>
                </span>
                )}
        };

        return objectiveTemplates[data.type](data);
    },

    render: function () {
        var encounter = this.props.target;

        if (_.isObject(encounter)) {
            return (
                <div className="item-link-wrapper col-md-12">
                    <div className="item-link actor-link">
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