'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Pathfinder = require('../../../helpers/Pathfinder');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var AttrBlock = require('../../Model/AttrBlock');



var ShopBookstoreAdventureInfo = React.createClass({

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
                    <div className="col-md-12">
                        <div className="text-peterriver bg-peterriver">
                            <p className="body-header">Scrolls</p>
                            <p>
                                Similar to Potions, <strong>Scrolls</strong> contain spells.  They can be found in the <strong>Core Rulebook, pg 490</strong>.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            );
    }
});

module.exports = ShopBookstoreAdventureInfo;