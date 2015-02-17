'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Model = require('../models/LocationModel');

var Modal = require('./ModelFormModal');
var Input = require('./ModelFormInput');



var LocationFormModal = React.createClass({
    render: function () {
        var location = _.isObject(this.props.location) ? this.props.location : undefined;
        var attrs = _.isObject(location) ? location.attrs : {};

        return (
            <Modal
                titlePart="Location"
                model={Model}

                target={location}
                related={this.props.campaign}
                relatedKey="campaign_id"

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
                    name="coordinate"
                    defaultValue={attrs.coordinate}
                />
            </Modal>
            );
    }
});

module.exports = LocationFormModal;


