'use strict';

var React = require('react/addons');
var _ = require('lodash');

var TaskModel = require('../models/TaskModel');

var Modal = require('./ModelFormModal');
var Input = require('./ModelFormInput');



var TaskFormModal = React.createClass({
    render: function () {

        var task = _.isObject(this.props.task) ? this.props.task : undefined;
        var attrs = _.isObject(task) ? task.attrs : {};

        var inputs = (
            <div>
                <Input
                    type="text"
                    name="objective"
                    defaultValue={attrs.objective}
                />
                <Input
                    type="textarea"
                    name="details"
                    defaultValue={attrs.details}
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
                titlePart="Task"
                model={TaskModel}

                target={task}
                related={this.props.quest}
                relatedKey="quest_id"

                inputs={inputs}

                className={this.props.className}
                onUpdate={this.props.onUpdate}
            />
            );
    }
});

module.exports = TaskFormModal;


