'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Pathfinder = require('../../../helpers/Pathfinder');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var AttrBlock = require('../../Model/AttrBlock');



var ShopGeneralGoodsAdventureInfo = React.createClass({

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
                        <div className="text-orange bg-orange">
                            <p className="body-header">Adventuring Gear</p>
                            <p>
                                <strong>Adventuring Gear</strong> can be found in <strong>Core Rulebook, pg 158</strong>.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="text-peterriver bg-peterriver">
                            <p className="body-header">Tools and Skill Kits</p>
                            <p>
                                <strong>Tools and Skill Kits</strong> can be found in <strong>Core Rulebook, pg 158</strong>.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            );
    }
});

module.exports = ShopGeneralGoodsAdventureInfo;