'use strict';

var React = require('react/addons');
var _ = require('lodash');

var QuestModel = require('../models/QuestModel');

var Modal = require('./ModelFormModal');
var Input = require('./ModelFormInput');



var QuestFormModal = React.createClass({
    render: function () {

        var quest = _.isObject(this.props.quest) ? this.props.quest : undefined;
        var attrs = _.isObject(quest) ? quest.attrs : {};

        var inputs = (
            <div>
                <Input
                    type="text"
                    name="title"
                    defaultValue={attrs.title}
                />
                <Input
                    type="textarea"
                    name="story"
                    defaultValue={attrs.story}
                />
                <Input
                    type="textarea"
                    name="goal"
                    defaultValue={attrs.goal}
                />
                <Input
                    type="text"
                    name="order"
                    placeholder="Sort Order"
                    defaultValue={attrs.order}
                />
            </div>
            );

        return (
            <Modal
                titlePart="Quest"
                model={QuestModel}

                target={quest}
                related={this.props.act}
                relatedKey="act_id"

                inputs={inputs}

                className={this.props.className}
                onUpdate={this.props.onUpdate}
            />
            );
    }
});

module.exports = QuestFormModal;