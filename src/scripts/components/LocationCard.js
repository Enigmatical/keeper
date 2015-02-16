'use strict';

var React = require('react/addons');
var Markdown = require('markdown').markdown;

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var LocationFormModal = require('./LocationFormModal');
var LocationRemoveModal = require('./LocationRemoveModal');

require('../../styles/ItemCard.css');



var LocationCard = React.createClass({
    render: function () {
        var flavor = Markdown.toHTML(this.props.location.attrs.flavor);
        var appearance = Markdown.toHTML(this.props.location.attrs.appearance);
        var history = Markdown.toHTML(this.props.location.attrs.history);

        return (
            <div className="item-card location-card">
                <div className="card-header">
                    <p>
                        {this.props.location.attrs.name}&nbsp;&nbsp;<small className="text-muted">{this.props.location.attrs.category}</small>
                    </p>
                </div>
                <div className="card-body">
                    <p className="body-header">Flavor</p>
                    <div className="body-content" dangerouslySetInnerHTML={{__html: flavor}} />
                    <p className="body-header">Appearance</p>
                    <div className="body-content" dangerouslySetInnerHTML={{__html: appearance}} />
                    <p className="body-header">History</p>
                    <div className="body-content" dangerouslySetInnerHTML={{__html: history}} />
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <ButtonLink bsStyle="primary" bsSize="small" to="manage-areas" params={{campaignId: this.props.campaign.id, locationId: this.props.location.id}}><Glyphicon glyph="cog" /> Manage Areas &amp; Shops</ButtonLink>
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <LocationFormModal campaign={this.props.campaign} location={this.props.location} onUpdate={this.props.onUpdate} />
                        <LocationRemoveModal location={this.props.location} onUpdate={this.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = LocationCard;


