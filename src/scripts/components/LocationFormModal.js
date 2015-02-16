'use strict';

var React = require('react/addons');
var _ = require('lodash');

var LocationModel = require('../models/LocationModel');

var Modal = require('./ModelFormModal');
var Input = require('./ModelFormInput');



var LocationFormModal = React.createClass({
    render: function () {

        var location = _.isObject(this.props.location) ? this.props.location : undefined;
        var attrs = _.isObject(location) ? location.attrs : {};

        var inputs = (
            <div>
                <Input
                    type="text"
                    name="name"
                    defaultValue={attrs.name}
                />
                <Input
                    type="text"
                    name="category"
                    defaultValue={attrs.category}
                />
                <Input
                    type="textarea"
                    name="flavor"
                    defaultValue={attrs.flavor}
                />
                <Input
                    type="textarea"
                    name="appearance"
                    defaultValue={attrs.appearance}
                />
                <Input
                    type="textarea"
                    name="history"
                    defaultValue={attrs.history}
                />
            </div>
            );

        return (
            <Modal
                titlePart="Location"
                model={LocationModel}

                target={location}
                related={this.props.campaign}
                relatedKey="campaign_id"

                inputs={inputs}

                className={this.props.className}
                onUpdate={this.props.onUpdate}
            />
            );
    }
});

module.exports = LocationFormModal;


