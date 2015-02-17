'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Auth = require('../helpers/Auth');

var Model = require('../models/FoeModel');

var Modal = require('./ModelFormModal');
var Input = require('./ModelFormInput');



var FoeFormModal = React.createClass({
    render: function() {
        var foe = _.isObject(this.props.foe) ? this.props.foe : undefined;
        var attrs = _.isObject(foe) ? foe.attrs : {};

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
                    type="text"
                    name="challenge"
                    placeholder="Challenge Rating"
                    defaultValue={attrs.challenge}
                    addonAfter="CR"
                />

                <Input
                    type="textarea"
                    name="flavor"
                    defaultValue={attrs.flavor}
                />

                <Input
                    type="textarea"
                    name="quick"
                    placeholder="Quick (Init, AC, hp, Attacks)"
                    defaultValue={attrs.quick}
                />

                <Input
                    type="textarea"
                    name="details"
                    placeholder="Detailed (Defense, Offense, Stats)"
                    defaultValue={attrs.details}
                />

                <Input
                    type="text"
                    name="rewardXp"
                    placeholder="Reward XP"
                    defaultValue={attrs.rewardXp}
                    addonAfter="XP"
                />

                <Input
                    type="text"
                    name="rewardCoin"
                    placeholder="Reward Coin"
                    defaultValue={attrs.rewardCoin}
                    addonAfter="gp"
                />

                <Input
                    type="text"
                    name="page"
                    placeholder="Bestiary Page"
                    defaultValue={attrs.page}
                />

                <Input
                    type="text"
                    name="onHand"
                    placeholder="Pawns On Hand"
                    defaultValue={attrs.onHand}
                />
            </Modal>
            );
    }
});

module.exports = FoeFormModal;


