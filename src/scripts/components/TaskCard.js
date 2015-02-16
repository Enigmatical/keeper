'use strict';

var React = require('react/addons');
var Markdown = require('markdown').markdown;

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var TaskFormModal = require('./TaskFormModal');
var TaskRemoveModal = require('./TaskRemoveModal');

require('../../styles/ItemCard.css');



var TaskCard = React.createClass({
    render: function () {
        var details = Markdown.toHTML(this.props.task.attrs.details);

        return (
            <div className="item-card act-card">
                <div className="card-header">
                    <p>
                        {this.props.task.attrs.objective}
                    </p>
                </div>
                <div className="card-body">
                    <p className="body-header">Details</p>
                    <div className="body-content" dangerouslySetInnerHTML={{__html: details}} />
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <TaskFormModal quest={this.props.quest} task={this.props.task} onUpdate={this.props.onUpdate} />
                        <TaskRemoveModal task={this.props.task} onUpdate={this.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = TaskCard;


