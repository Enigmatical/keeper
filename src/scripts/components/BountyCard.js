'use strict';

var React = require('react/addons');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var FormModal = require('./BountyFormModal');
var RemoveModal = require('./BountyRemoveModal');
var AttrBlock = require('./ModelAttrBlock');

require('../../styles/ItemCard.css');



var BountyCard = React.createClass({
    render: function () {
        var self = this;
        var location = self.props.location;
        var bounty = self.props.bounty;

        return (
            <div className="item-card bounty-card">
                <div className="card-header">
                    <p className="pull-left">
                        {bounty.attrs.name}
                    </p>
                    <p className="pull-right">
                        <small className="text-muted">{bounty.attrs.type}&nbsp;&nbsp;<strong>CR {bounty.attrs.challenge}</strong></small>
                    </p>
                </div>
                <div className="card-body">
                    <AttrBlock name="Flavor" attr={bounty.attrs.flavor} markdown />
                    <AttrBlock name="Challenge Rating" attr={bounty.attrs.challenge} />
                    <AttrBlock name="Reward XP" attr={bounty.attrs.rewardXp} />
                    <AttrBlock name="Reward Coin (gp)" attr={bounty.attrs.rewardCoin} />
                    <AttrBlock name="Rewards" attr={bounty.attrs.rewardOther} markdown />
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <Button bsSize="small" bsStyle="warning"><Glyphicon glyph="link" /> Encounter</Button>
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal location={location} bounty={bounty} onUpdate={self.props.onUpdate} />
                        <RemoveModal bounty={bounty} onUpdate={self.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = BountyCard;





