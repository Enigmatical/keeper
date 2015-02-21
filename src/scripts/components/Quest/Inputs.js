'use strict';

var React = require('react/addons');

var Pathfinder = require('../../helpers/Pathfinder');

var Input = require('../Model/FormInput');



var QuestInputs = React.createClass({
    handleRewards: function() {
        var challenge = this.refs.challenge.getDOMNode().querySelector('[name=challenge]').value;
        var quality = this.refs.quality.getDOMNode().querySelector('[name=quality]').value;

        var rewardXp = Pathfinder.getXp(challenge);
        var rewardCoin = Pathfinder.getTreasure(challenge, quality);

        this.refs.rewardXp.getDOMNode().querySelector('[name=rewardXp]').setAttribute('value', rewardXp);
        this.refs.rewardCoin.getDOMNode().querySelector('[name=rewardCoin]').setAttribute('value', rewardCoin);
    },

    render: function() {
        var attrs = this.props.attrs;

        return (
            <div>
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
                            options={Pathfinder.getChallengeRatingOptions()}
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
                            options={Pathfinder.getRewardModifierOptions()}
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
            </div>
            );
    }
});

module.exports = QuestInputs;