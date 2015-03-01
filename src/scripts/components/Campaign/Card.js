'use strict';

var React = require('react/addons');
var Auth = require('../../helpers/Auth');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var FormModal = require('../Model/FormModal');
var RemoveModal = require('../Model/RemoveModal');
var AttrBlock = require('../Model/AttrBlock');

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
                    <AttrBlock type="flavor" attr={campaign.attrs.flavor} />
                    <AttrBlock type="details" attr={campaign.attrs.details} />
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <ButtonLink bsStyle="success" bsSize="small" to="manage-saves" params={{campaignId: campaign.id}}><Glyphicon glyph="cog" /> Saves</ButtonLink>
                        <ButtonLink bsStyle="primary" bsSize="small" to="manage-acts" params={{campaignId: campaign.id}}><Glyphicon glyph="cog" /> Acts</ButtonLink>
                        <ButtonLink bsStyle="primary" bsSize="small" to="manage-locations" params={{campaignId: campaign.id}}><Glyphicon glyph="cog" /> Locations</ButtonLink>
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal target={campaign} model={this.props.model} parent={Auth.User} inputs={this.props.inputs} onUpdate={this.props.onUpdate} />
                        <RemoveModal target={campaign} onUpdate={this.props.onUpdate}>
                            <p className="text-danger">
                                This will also <strong>remove</strong> all associated:
                                <ul className="text-danger">
                                    <li>Acts</li>
                                    <li>Quests</li>
                                    <li>Tasks</li>
                                    <li>Locations</li>
                                    <li>Bounties</li>
                                </ul>
                            </p>
                        </RemoveModal>
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = CampaignCard;