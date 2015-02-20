'use strict';

var React = require('react/addons');
var Markdown = require('markdown').markdown;

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var FormModal = require('./FormModal');
var RemoveModal = require('../Model/RemoveModal');
var AttrBlock = require('../Model/AttrBlock');

require('../../../styles/ItemCard.css');



var TaskCard = React.createClass({
    render: function () {
        var campaign = this.props.campaign;
        var act = this.props.act;
        var quest = this.props.quest;
        var task = this.props.task;

        return (
            <div className="item-card task-card">
                <div className="card-header">
                    <p className="pull-left">
                        {task.attrs.name}
                    </p>
                    <p className="pull-right">
                        <span />
                    </p>
                </div>
                <div className="card-body">
                    <AttrBlock name="Flavor" attr={task.attrs.flavor} markdown />
                    <AttrBlock name="Details" attr={task.attrs.details} markdown />
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <Button bsStyle="warning" bsSize="small"><Glyphicon glyph="plus" /> Encounter</Button>
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal quest={quest} task={task} onUpdate={this.props.onUpdate} />
                        <RemoveModal target={task} onUpdate={this.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = TaskCard;


