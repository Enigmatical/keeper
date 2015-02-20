'use strict';

var React = require('react/addons');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var FormModal = require('./FormModal');
var RemoveModal = require('./RemoveModal');
var AttrBlock = require('../Model/AttrBlock');

require('../../../styles/ItemCard.css');



var FoeCard = React.createClass({
    render: function () {
        var foe = this.props.foe;

        return (
            <div className="item-card foe-card">
                <div className="card-header">
                    <p className="pull-left">
                        {foe.attrs.name}
                    </p>
                    <p className="pull-right">
                        <small className="text-muted">{foe.attrs.type}&nbsp;&nbsp;<strong>CR {foe.attrs.challenge}</strong></small>
                    </p>
                </div>
                <div className="card-body">
                    <AttrBlock name="Flavor" attr={foe.attrs.flavor} markdown />
                    <AttrBlock name="Quick" attr={foe.attrs.quick} markdown />
                    <AttrBlock name="Pawns On Hand" attr={foe.attrs.onHand} />
                    <AttrBlock name="Bestiary Page" attr={foe.attrs.page} />
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <span />
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal foe={foe} onUpdate={this.props.onUpdate} />
                        <RemoveModal foe={foe} onUpdate={this.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = FoeCard;