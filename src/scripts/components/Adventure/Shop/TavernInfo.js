'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Pathfinder = require('../../../helpers/Pathfinder');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var AttrBlock = require('../../Model/AttrBlock');

var AdjustTime = require('../AdjustTimeButton');



var ShopTavernAdventureInfo = React.createClass({

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
                    <div className="col-md-3">
                        <div className="text-orange bg-orange">
                            <p className="body-header">Lodging</p>
                            <p>
                                There are three categories of <strong>Rooms</strong>: <strong>Poor</strong> (1 gp/day), <strong>Common</strong> (5 gp/day), <strong>Good</strong> (10 gp/day).
                            </p>
                            <AdjustTime save={this.props.save} segs={16} onSave={this.props.onSave} />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="text-wetasphalt bg-wetasphalt">
                            <p className="body-header">Food &amp; Drink</p>
                            <p>
                                Selections of <strong>Food &amp; Drink</strong> are listed in the <strong>Core Rulebook, pg 159</strong>.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="text-emerald bg-emerald">
                            <p className="body-header">Bounty Board</p>
                            <p>
                                A central location in nearly every town where villagers can leave <strong>Requests</strong> for local adventurers.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            );
    }
});

module.exports = ShopTavernAdventureInfo;