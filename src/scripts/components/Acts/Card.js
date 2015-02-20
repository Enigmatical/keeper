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



var ActCard = React.createClass({
    render: function () {
        var campaign = this.props.campaign;
        var act = this.props.act;

        return (
            <div className="item-card act-card">
                <div className="card-header">
                    <p className="pull-left">
                        {act.attrs.name}
                    </p>
                    <p className="pull-right">
                        <small className="text-muted">{act.attrs.type}</small>
                    </p>
                </div>
                <div className="card-body">
                    <AttrBlock name="Flavor" attr={act.attrs.flavor} markdown />
                    <AttrBlock name="Details" attr={act.attrs.details} markdown />
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <ButtonLink bsStyle="primary" bsSize="small" to="manage-quests" params={{campaignId: campaign.id, actId: act.id}}><Glyphicon glyph="cog" /> Quests</ButtonLink>
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal campaign={campaign} act={act} onUpdate={this.props.onUpdate} />
                        <RemoveModal act={act} onUpdate={this.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = ActCard;


