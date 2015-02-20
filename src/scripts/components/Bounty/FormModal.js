'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Pathfinder = require('../../helpers/Pathfinder');

var Model = require('../../models/BountyModel');

var Modal = require('../Model/FormModal');
var Input = require('../Model/FormInput');



var BountyFormModal = React.createClass({
    handleRewards: function() {
        var challenge = this.refs.challenge.getDOMNode().querySelector('[name=challenge]').value;
        var quality = this.refs.quality.getDOMNode().querySelector('[name=quality]').value;

        var rewardXp = Pathfinder.getXp(challenge);
        var rewardCoin = Pathfinder.getTreasure(challenge, quality);

        this.refs.rewardXp.getDOMNode().querySelector('[name=rewardXp]').setAttribute('value', rewardXp);
        this.refs.rewardCoin.getDOMNode().querySelector('[name=rewardCoin]').setAttribute('value', rewardCoin);
    },

    render: function () {
        var bounty = _.isObject(this.props.bounty) ? this.props.bounty : undefined;
        var attrs = _.isObject(bounty) ? bounty.attrs : {};

        var challengeOptions = Pathfinder.getChallengeRatingOptions();
        var rewardOptions = Pathfinder.getRewardModifierOptions();

        return (
            <Modal
                titlePart="Bounty"
                model={Model}

                target={bounty}
                related={this.props.location}
                relatedKey="location_id"

                className={this.props.className}
                onUpdate={this.props.onUpdate}
            >
                <Input
                    type="text"
                    name="name"
                    defaultValue={attrs.name}
                />
                <Input
                    type="text"
                    name="type"
                    defaultValue={attrs.type}
                />
                <Input
                    type="textarea"
                    name="details"
                    defaultValue={attrs.details}
                />
                <Input
                    type="textarea"
                    name="flavor"
                    defaultValue={attrs.flavor}
                />

                <div className="row">
                    <div className="col-md-6">
                        <Input
                            type="select"
                            name="challenge"
                            ref="challenge"
                            placeholder="Challenge Rating"
                            options={challengeOptions}
                            defaultValue={attrs.challenge}
                            onChange={this.handleRewards}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            type="select"
                            name="quality"
                            ref="quality"
                            placeholder="Treasure"
                            options={rewardOptions}
                            defaultValue={attrs.quality || 'standard'}
                            onChange={this.handleRewards}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <Input
                            type="text"
                            name="rewardXp"
                            ref="rewardXp"
                            placeholder="Reward XP"
                            value={attrs.rewardXp}
                            readOnly
                            addonAfter="XP"
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            type="text"
                            name="rewardCoin"
                            ref="rewardCoin"
                            placeholder="Reward Coin"
                            value={attrs.rewardCoin}
                            readOnly
                            addonAfter="gp"
                        />
                    </div>
                </div>

                <Input
                    type="textarea"
                    name="rewardOther"
                    placeholder="Rewards"
                    defaultValue={attrs.rewardOther}
                />
            </Modal>
            );
    }
});

module.exports = BountyFormModal;

