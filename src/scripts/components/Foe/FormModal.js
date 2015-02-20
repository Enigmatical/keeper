'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Auth = require('../../helpers/Auth');
var Pathfinder = require('../../helpers/Pathfinder');

var Model = require('../../models/FoeModel');

var Modal = require('../Model/FormModal');
var Input = require('../Model/FormInput');



var FoeFormModal = React.createClass({
    handleRewards: function() {
        var challenge = this.refs.challenge.getDOMNode().querySelector('[name=challenge]').value;
        var quality = this.refs.quality.getDOMNode().querySelector('[name=quality]').value;

        var rewardXp = Pathfinder.getXp(challenge);
        var rewardCoin = Pathfinder.getTreasure(challenge, quality);

        this.refs.rewardXp.getDOMNode().querySelector('[name=rewardXp]').setAttribute('value', rewardXp);
        this.refs.rewardCoin.getDOMNode().querySelector('[name=rewardCoin]').setAttribute('value', rewardCoin);
    },

    render: function() {
        var foe = _.isObject(this.props.foe) ? this.props.foe : undefined;
        var attrs = _.isObject(foe) ? foe.attrs : {};

        var challengeOptions = Pathfinder.getChallengeRatingOptions();
        var rewardOptions = Pathfinder.getRewardModifierOptions();

        return (
            <Modal
                titlePart="Foe"
                model={Model}

                target={foe}
                related={Auth.User}
                relatedKey="user_id"

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
                    placeholder="Race & Class"
                    defaultValue={attrs.type}
                />

                <Input
                    type="textarea"
                    name="flavor"
                    defaultValue={attrs.flavor}
                />

                <Input
                    type="textarea"
                    name="quick"
                    placeholder="Quick (Init, Senses, AC, hp, Speed, Attacks)"
                    defaultValue={attrs.quick}
                />

                <Input
                    type="textarea"
                    name="details"
                    placeholder="Detailed (Defense, Offense, Stats)"
                    defaultValue={attrs.details}
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

                <div className="row">
                    <div className="col-md-6">
                        <Input
                            type="text"
                            name="page"
                            placeholder="Bestiary Page"
                            defaultValue={attrs.page}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            type="text"
                            name="onHand"
                            placeholder="Pawns On Hand"
                            defaultValue={attrs.onHand}
                        />
                    </div>
                </div>
            </Modal>
            );
    }
});

module.exports = FoeFormModal;


