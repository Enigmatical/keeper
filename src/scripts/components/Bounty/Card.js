'use strict';

var React = require('react/addons');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var FormModal = require('../Model/FormModal');
var RemoveModal = require('../Model/RemoveModal');
var AttrBlock = require('../Model/AttrBlock');

require('../../../styles/ItemCard.css');



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
                    <AttrBlock name="Rewards" attr={bounty.attrs.rewardOther} markdown />
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <Button bsSize="small" bsStyle="warning"><Glyphicon glyph="link" /> Encounter</Button>
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal target={bounty} model={this.props.model} related={{key: 'location_id', on: location}} inputs={this.props.inputs} onUpdate={self.props.onUpdate} />
                        <RemoveModal target={bounty} onUpdate={self.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = BountyCard;





