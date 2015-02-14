'use strict';

var React = require('react/addons');
var Markdown = require('markdown').markdown;

var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var AddActModal = require('./AddActModal');
var RemoveActModal = require('./RemoveActModal');

require('../../styles/ItemCard.css');



var ActCard = React.createClass({
    render: function () {
        var story = Markdown.toHTML(this.props.act.attrs.story);
        var goal = Markdown.toHTML(this.props.act.attrs.goal);

        return (
            <div className="item-card act-card">
                <div className="card-header">
                    <p>
                        {this.props.act.attrs.title}&nbsp;&nbsp;<small className="text-muted">{this.props.act.attrs.category}</small>
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
                        <ButtonLink bsStyle="primary" bsSize="small" to="act" params={{campaignId: this.props.campaign.id, actId: this.props.act.id}}><Glyphicon glyph="cog" /> Manage</ButtonLink>
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <AddActModal campaign={this.props.campaign} act={this.props.act} editMode={true} onUpdate={this.props.onUpdate} />
                        <RemoveActModal act={this.props.act} onUpdate={this.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = ActCard;


