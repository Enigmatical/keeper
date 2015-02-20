'use strict';

var React = require('react/addons');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var FormModal = require('./FormModal');
var RemoveModal = require('../Model/RemoveModal');
var AttrBlock = require('.././Model/AttrBlock');

require('../../../styles/ItemCard.css');



var AreaCard = React.createClass({
    render: function () {
        var location = this.props.location;
        var area = this.props.area;

        return (
            <div className="item-card area-card">
                <div className="card-header">
                    <p className="pull-left">
                        {area.attrs.name}
                    </p>
                    <p className="pull-right">
                        <small className="text-muted">{area.attrs.type}</small>
                    </p>
                </div>
                <div className="card-body">
                    <AttrBlock name="Flavor" attr={area.attrs.flavor} markdown />
                    <AttrBlock name="Details" attr={area.attrs.details} markdown />
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <Button bsStyle="warning" bsSize="small"><Glyphicon glyph="plus" /> Encounter</Button>
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal location={location} area={area} onUpdate={this.props.onUpdate} />
                        <RemoveModal target={area} onUpdate={this.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = AreaCard;