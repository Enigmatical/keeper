'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Model = require('../../models/TaskModel');

var Modal = require('../Model/FormModal');
var Input = require('../Model/FormInput');



var TaskFormModal = React.createClass({
    render: function () {
        var task = _.isObject(this.props.task) ? this.props.task : undefined;
        var attrs = _.isObject(task) ? task.attrs : {};

        return (
            <Modal
                titlePart="Task"
                model={Model}

                target={task}
                related={this.props.quest}
                relatedKey="quest_id"

                className={this.props.className}
                onUpdate={this.props.onUpdate}
            >
                <Input
                    type="text"
                    name="name"
                    placeholder="Objective"
                    defaultValue={attrs.name}
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
            </Modal>
            );
    }
});

module.exports = TaskFormModal;


