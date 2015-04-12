'use strict';

var React = require('react/addons');
var _ = require('lodash');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var AttrBlock = require('../../Model/AttrBlock');

var TravelInfo = require('./TravelInfo');
var SocialInfo = require('./SocialInfo');
var SkillCheckInfo = require('./SkillCheckInfo');
var CombatInfo = require('./CombatInfo');
var MechanismInfo = require('./MechanismInfo');
var TreasureInfo = require('./TreasureInfo');
var OtherInfo = require('./OtherInfo');

require('../../../../styles/ItemCard.css');



var EncounterAdventureCard = React.createClass({
    getObjective: function(data) {
        var objectiveTemplates = {
            travel: function(data) { return (
                <span>
                    <Glyphicon glyph="globe" />&nbsp;&nbsp;<small className="text-muted">Travel to</small> <strong>{data.details.area}</strong> <small class="text-muted">in</small> <strong>{data.details.location}</strong>
                </span>
                )},
            social: function(data) { return (
                <span>
                    <Glyphicon glyph="comment" />&nbsp;&nbsp;<small className="text-muted">Conversation with</small> <strong>{data.details.character}</strong>
                </span>
                )},
            skillCheck: function(data) { return(
                <span>
                    <Glyphicon glyph="eye-open" />&nbsp;&nbsp;<strong>{data.details.skill}</strong> <small className="text-muted">Check,</small> <strong>DC {data.details.skillDifficulty}</strong>
                </span>
                )},
            combat: function(data) { return(
                <span>
                    <Glyphicon glyph="warning-sign" />&nbsp;&nbsp;<small className="text-muted">Combat with</small> <strong>{data.details.battle}</strong>
                </span>
                )},
            mechanism: function(data) { return(
                <span>
                    <Glyphicon glyph="cog" />&nbsp;&nbsp;<small className="text-muted">Interact with</small> <strong>{data.details.name} ({_.startCase(data.details.mechanism)})</strong>
                </span>
                )},
            treasure: function(data) { return(
                <span>
                    <Glyphicon glyph="gift" />&nbsp;&nbsp;<strong>{data.details.name}</strong>
                </span>
                )},
            other: function(data) { return(
                <span>
                    <Glyphicon glyph="question-sign" />&nbsp;&nbsp;<strong>{data.details.name}</strong>
                </span>
                )}
        };

        return objectiveTemplates[data.type](data);
    },

    getBody: function(data) {
        var save = this.props.save;
        var onSave = this.props.onSave;

        var objectiveTemplates = {
            travel:         function(data) { return(<TravelInfo data={data} save={save} onSave={onSave} />); },
            social:         function(data) { return(<SocialInfo data={data} save={save} onSave={onSave} />); },
            skillCheck:     function(data) { return(<SkillCheckInfo data={data} save={save} onSave={onSave} />); },
            combat:         function(data) { return(<CombatInfo data={data} save={save} onSave={onSave} />); },
            mechanism:      function(data) { return(<MechanismInfo data={data} save={save} onSave={onSave} />); },
            treasure:       function(data) { return(<TreasureInfo data={data} save={save} onSave={onSave} />); },
            other:          function(data) { return(<OtherInfo data={data} save={save} onSave={onSave} />); }
        };

        return objectiveTemplates[data.type](data);
    },

    render: function () {
        var self = this;
        var target = self.props.target;

        var encounterFlavor = (<span />);
        if (!_.isEmpty(target.attrs.flavor)) {
            encounterFlavor = (
                    <AttrBlock type="flavor" attr={target.attrs.flavor} />
                );
        }

        return (
            <div className="item-card adventure-card encounter-card">
                <div className="card-header">
                    <p className="pull-left">
                        {self.getObjective(target.attrs)}
                    </p>
                    <p className="pull-right">
                        <small className="text-muted">{_.startCase(target.attrs.type)}</small>
                    </p>
                </div>

                {encounterFlavor}
                {self.getBody(target.attrs)}
            </div>
            );
    }
});

module.exports = EncounterAdventureCard;