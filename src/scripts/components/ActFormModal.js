'use strict';

var React = require('react/addons');
var _ = require('lodash');

var ActModel = require('../models/ActModel');

var Modal = require('./ModelFormModal');
var Input = require('./ModelFormInput');



var ActFormModal = React.createClass({
    render: function () {

    var act = _.isObject(this.props.act) ? this.props.act : undefined;
    var attrs = _.isObject(act) ? act.attrs : {};

    var inputs = (
        <div>
            <Input
                type="text"
                name="title"
                defaultValue={attrs.title}
            />
            <Input
                type="text"
                name="category"
                defaultValue={attrs.category}
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
                titlePart="Act"
                model={ActModel}

                target={act}
                related={this.props.campaign}
                relatedKey="campaign_id"

                inputs={inputs}

                className={this.props.className}
                onUpdate={this.props.onUpdate}
            />
            );
    }
});

module.exports = ActFormModal;