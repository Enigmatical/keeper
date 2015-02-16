'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Model = require('../models/QuestModel');

var Modal = require('./ModelFormModal');
var Input = require('./ModelFormInput');



var QuestFormModal = React.createClass({
    render: function () {
        var quest = _.isObject(this.props.quest) ? this.props.quest : undefined;
        var attrs = _.isObject(quest) ? quest.attrs : {};

        return (
            <Modal
                titlePart="Quest"
                model={Model}

                target={quest}
                related={this.props.act}
                relatedKey="act_id"

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
                <Input
                    type="text"
                    name="challenge"
                    placeholder="Challenge Rating"
                    defaultValue={attrs.challenge}
                />
                <Input
                    type="text"
                    name="rewardXp"
                    placeholder="Reward XP"
                    defaultValue={attrs.rewardXp}
                />
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

module.exports = QuestFormModal;