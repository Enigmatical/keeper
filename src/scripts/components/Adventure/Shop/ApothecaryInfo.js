'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Pathfinder = require('../../../helpers/Pathfinder');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var AttrBlock = require('../../Model/AttrBlock');



var ShopApothecaryAdventureInfo = React.createClass({
    render: function () {
        var target = this.props.target;
        var shopDetails = Pathfinder.getShopModifierDetails(target.attrs.quality);

        return (
            <div>
                <section className="row">
                    <div className="col-md-12">
                        <p className="body-header">Services</p>
                    </div>
                </section>
                <section className="row">
                    <div className="col-md-6">
                        <div className="text-peterriver bg-peterriver">
                            <p className="body-header">Alchemical Goods</p>
                            <p>
                                Any of the <strong>Special Substances and Items</strong> found in the <strong>Core Rulebook, pg 158</strong> are available for purchase.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="text-alizarin bg-alizarin">
                            <p className="body-header">Potions</p>
                            <p>
                                Any of spell can be stored as a <strong>Potion</strong>.  See <strong>Core Rulebook, pg 478</strong> for prices.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            );
    }
});

module.exports = ShopApothecaryAdventureInfo;