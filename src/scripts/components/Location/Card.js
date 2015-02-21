'use strict';

var React = require('react/addons');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var FormModal = require('../Model/FormModal');
var RemoveModal = require('../Model/RemoveModal');
var AttrBlock = require('../Model/AttrBlock');

require('../../../styles/ItemCard.css');



var LocationCard = React.createClass({
    render: function () {
        var campaign = this.props.campaign;
        var location = this.props.location;

        return (
            <div className="item-card location-card">
                <div className="card-header">
                    <p className="pull-left">
                        {location.attrs.name}
                    </p>
                    <p className="pull-right">
                        <small className="text-muted">{location.attrs.type}</small>
                    </p>
                </div>
                <div className="card-body">
                    <AttrBlock name="Flavor" attr={location.attrs.flavor} markdown />
                    <AttrBlock name="Details" attr={location.attrs.details} markdown />
                    <AttrBlock name="Coordinate" attr={location.attrs.coordinate} />
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <ButtonLink bsStyle="primary" bsSize="small" to="manage-areas" params={{campaignId: campaign.id, locationId: location.id}}><Glyphicon glyph="cog" /> Areas, Shops, &amp; Bounties</ButtonLink>
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal target={location} model={this.props.model} parent={campaign} inputs={this.props.inputs} onUpdate={this.props.onUpdate} />
                        <RemoveModal target={location} onUpdate={this.props.onUpdate}>
                            <p className="text-danger">
                                This will also <strong>remove</strong> all associated:
                                <ul className="text-danger">
                                    <li>Areas</li>
                                    <li>Shops</li>
                                </ul>
                            </p>
                        </RemoveModal>
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = LocationCard;


