'use strict';

var React = require('react/addons');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var FormModal = require('./FormModal');
var RemoveModal = require('./RemoveModal');
var AttrBlock = require('../ModelAttrBlock');

require('../../../styles/ItemCard.css');



var CampaignCard = React.createClass({
    render: function () {
        var campaign = this.props.campaign;

        return (
            <div className="item-card campaign-card">
                <div className="card-header">
                    <p className="pull-left">
                        {campaign.attrs.name}
                    </p>
                    <p className="pull-right">
                        <span />
                    </p>
                </div>
                <div className="card-body">
                    <AttrBlock name="Flavor" attr={campaign.attrs.flavor} markdown />
                    <AttrBlock name="Details" attr={campaign.attrs.details} markdown />
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <Button bsStyle="success" bsSize="small"><Glyphicon glyph="play" /> Run</Button>
                        <ButtonLink bsStyle="primary" bsSize="small" to="manage-acts" params={{campaignId: campaign.id}}><Glyphicon glyph="cog" /> Acts</ButtonLink>
                        <ButtonLink bsStyle="primary" bsSize="small" to="manage-locations" params={{campaignId: campaign.id}}><Glyphicon glyph="cog" /> Locations</ButtonLink>
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal campaign={campaign} onUpdate={this.props.onUpdate} />
                        <RemoveModal campaign={campaign} onUpdate={this.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = CampaignCard;