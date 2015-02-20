'use strict';

var React = require('react/addons');
var _ = require('lodash');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var FormModal = require('./FormModal');
var RemoveModal = require('./RemoveModal');
var AttrBlock = require('../Model/AttrBlock');

var CharacterLinkModal = require('../Character/LinkModal');
var CharacterLink = require('../Character/Link');

require('../../../styles/ItemCard.css');



var ShopCard = React.createClass({
    getShopkeepers: function() {
        var self = this;
        var shop = self.props.shop;

        if (shop.attrs.shopkeepers.length > 0) {
            return(
                    <div>
                        <p className="body-header">Shopkeepers</p>
                        <div className="card-links">
                            {shop.attrs.shopkeepers.map(function(char, index) {
                                return (
                                    <CharacterLink key={char.id+index} target={shop} link={char} index={index} onUpdate={self.props.onUpdate} />
                                    );
                            })}
                        </div>
                    </div>
                );
        }
        else {
            return (<span />);
        }
    },

    render: function () {
        var self = this;
        var location = self.props.location;
        var shop = self.props.shop;

        var shopkeepers = self.getShopkeepers();

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
                    <AttrBlock name="Flavor" attr={shop.attrs.flavor} markdown />
                    <AttrBlock name="Details" attr={shop.attrs.details} markdown />
                    {shopkeepers}
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <CharacterLinkModal name="Shopkeeper" target={shop} onUpdate={self.props.onUpdate} />
                        <Button bsStyle="warning" bsSize="small"><Glyphicon glyph="link" /> Encounter</Button>
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal location={location} shop={shop} onUpdate={self.props.onUpdate} />
                        <RemoveModal shop={shop} onUpdate={self.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = ShopCard;


