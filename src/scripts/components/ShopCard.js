'use strict';

var React = require('react/addons');
var _ = require('lodash');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var FormModal = require('./ShopFormModal');
var RemoveModal = require('./ShopRemoveModal');
var AttrBlock = require('./ModelAttrBlock');

require('../../styles/ItemCard.css');



var ShopCard = React.createClass({
    render: function () {
        var location = this.props.location;
        var shop = this.props.shop;

        return (
            <div className="item-card shop-card">
                <div className="card-header">
                    <p className="pull-left">
                        {shop.attrs.name}
                    </p>
                    <p className="pull-right">
                        <small className="text-muted">{_.startCase(shop.attrs.type)}, <strong>{_.startCase(shop.attrs.quality)}</strong></small>
                    </p>
                </div>
                <div className="card-body">
                    <AttrBlock name="Shopkeeper" attr={shop.attrs.shopkeeper} />
                    <AttrBlock name="Flavor" attr={shop.attrs.flavor} markdown />
                    <AttrBlock name="Details" attr={shop.attrs.details} markdown />
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <Button bsStyle="warning" bsSize="small"><Glyphicon glyph="link" /> Shopkeeper</Button>
                        <Button bsStyle="warning" bsSize="small"><Glyphicon glyph="link" /> Encounter</Button>
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal location={location} shop={shop} onUpdate={this.props.onUpdate} />
                        <RemoveModal shop={shop} onUpdate={this.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = ShopCard;


