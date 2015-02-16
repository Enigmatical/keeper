'use strict';

var React = require('react/addons');
var Markdown = require('markdown').markdown;

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var CampaignFormModal = require('./CampaignFormModal');
var CampaignRemoveModal = require('./CampaignRemoveModal');

require('../../styles/ItemCard.css');



var CampaignCard = React.createClass({
    render: function () {
        var summary = Markdown.toHTML(this.props.campaign.attrs.summary);

        return (
            <div className="item-card campaign-card">
                <div className="card-header">
                    <p className="pull-left">
                        {this.props.campaign.attrs.title}&nbsp;&nbsp;<small className="text-muted">{this.props.campaign.attrs.subtitle}</small>
                    </p>
                    <p className="pull-right">
                        <span />
                    </p>
                </div>
                <div className="card-body">
                    <p className="body-header">Summary</p>
                    <div className="body-content" dangerouslySetInnerHTML={{__html: summary}} />
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <Button bsStyle="success" bsSize="small"><Glyphicon glyph="play" /> Run Campaign</Button>
                        <ButtonLink bsStyle="primary" bsSize="small" to="manage-acts" params={{campaignId: this.props.campaign.id}}><Glyphicon glyph="cog" /> Manage Acts</ButtonLink>
                        <ButtonLink bsStyle="primary" bsSize="small" to="manage-locations" params={{campaignId: this.props.campaign.id}}><Glyphicon glyph="cog" /> Manage Locations</ButtonLink>
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <CampaignFormModal campaign={this.props.campaign} onUpdate={this.props.onUpdate} />
                        <CampaignRemoveModal campaign={this.props.campaign} onUpdate={this.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = CampaignCard;


