'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Pathfinder = require('../../../helpers/Pathfinder');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var AttrBlock = require('../../Model/AttrBlock');



var ShopBlacksmithAdventureInfo = React.createClass({

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
                        <div className="text-alizarin bg-alizarin">
                            <p className="body-header">Weaponsmith</p>
                            <p>
                                Any <strong>Weapon</strong> from the <strong>Core Rulebook, pg 142</strong>.  <strong>Magical Weapons</strong> start on <strong>Core Rulebook, pg 467</strong>.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="text-peterriver bg-peterriver">
                            <p className="body-header">Armorsmith</p>
                            <p>
                                Any <strong>Armor</strong> and <strong>Shields</strong> from the <strong>Core Rulebook, pg 151</strong>.  <strong>Magical Armor</strong> and <strong>Shields</strong> start on <strong>Core Rulebook, pg 461</strong>.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            );
    }
});

module.exports = ShopBlacksmithAdventureInfo;