'use strict';

var React = require('react/addons');
var Markdown = require('markdown').markdown;

var MenuItem = require('react-bootstrap').MenuItem;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var QuestFormModal = require('./QuestFormModal');
var QuestRemoveModal = require('./QuestRemoveModal');

require('../../styles/ItemCard.css');



var QuestCard = React.createClass({
    render: function () {
        var story = Markdown.toHTML(this.props.quest.attrs.story);
        var goal = Markdown.toHTML(this.props.quest.attrs.goal);

        return (
            <div className="item-card act-card">
                <div className="card-header">
                    <p>
                        {this.props.quest.attrs.title}
                    </p>
                </div>
                <div className="card-body">
                    <p className="body-header">Story</p>
                    <div className="body-content" dangerouslySetInnerHTML={{__html: story}} />
                    <p className="body-header">Goal</p>
                    <div className="body-content" dangerouslySetInnerHTML={{__html: goal}} />
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <ButtonLink bsStyle="primary" bsSize="small" to="manage-tasks" params={{campaignId: this.props.campaign.id, actId: this.props.act.id, questId:this.props.quest.id}}><Glyphicon glyph="cog" /> Manage</ButtonLink>
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <QuestFormModal act={this.props.act} quest={this.props.quest} onUpdate={this.props.onUpdate} />
                        <QuestRemoveModal quest={this.props.quest} onUpdate={this.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = QuestCard;


