'use strict';

var React = require('react/addons');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var FormModal = require('./QuestFormModal');
var RemoveModal = require('./QuestRemoveModal');
var AttrBlock = require('./ModelAttrBlock');

require('../../styles/ItemCard.css');



var QuestCard = React.createClass({
    render: function () {
        var campaign = this.props.campaign;
        var act = this.props.act;
        var quest = this.props.quest;

        return (
            <div className="item-card quest-card">
                <div className="card-header">
                    <p className="pull-left">
                        {quest.attrs.name}
                    </p>
                    <p className="pull-right">
                        <small className="text-muted">{quest.attrs.type}&nbsp;&nbsp;<strong>CR {quest.attrs.challenge}</strong></small>
                    </p>
                </div>
                <div className="card-body">
                    <AttrBlock name="Flavor" attr={quest.attrs.flavor} markdown />
                    <AttrBlock name="Rewards" attr={quest.attrs.rewardOther} markdown />
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <ButtonLink bsStyle="primary" bsSize="small" to="manage-tasks" params={{campaignId: campaign.id, actId: act.id, questId: quest.id}}><Glyphicon glyph="cog" /> Tasks</ButtonLink>
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal act={act} quest={quest} onUpdate={this.props.onUpdate} />
                        <RemoveModal quest={quest} onUpdate={this.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = QuestCard;


