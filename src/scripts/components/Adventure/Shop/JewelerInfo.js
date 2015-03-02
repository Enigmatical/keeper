'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Pathfinder = require('../../../helpers/Pathfinder');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var AttrBlock = require('../../Model/AttrBlock');



var ShopJewelerAdventureInfo = React.createClass({

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
                    <div className="col-md-4">
                        <div className="text-amethyst bg-amethyst">
                            <p className="body-header">Rings</p>
                            <p>
                                Any <strong>Ring</strong> available in the <strong>Core Rulebook, pg 478</strong>.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="text-peterriver bg-peterriver">
                            <p className="body-header">Rods &amp; Staves</p>
                            <p>
                                <strong>Rods</strong> can be found in the <strong>Core Rulebook, pg 484</strong>.  <strong>Staves</strong> start on <strong>Core Rulebook, pg 491</strong>.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="text-emerald bg-emerald">
                            <p className="body-header">Wondrous Items</p>
                            <p>
                                <strong>Wondrous Items</strong> start on <strong>Core Rulebook, pg 496</strong>.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            );
    }
});

module.exports = ShopJewelerAdventureInfo;