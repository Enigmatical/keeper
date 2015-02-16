'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Model = require('../models/AreaModel');

var Modal = require('./ModelFormModal');
var Input = require('./ModelFormInput');



var AreaFormModal = React.createClass({
    render: function () {
        var area = _.isObject(this.props.area) ? this.props.area : undefined;
        var attrs = _.isObject(area) ? area.attrs : {};

        return (
            <Modal
                titlePart="Area"
                model={Model}

                target={area}
                related={this.props.location}
                relatedKey="location_id"

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
                    name="flavor"
                    defaultValue={attrs.flavor}
                />
                <Input
                    type="textarea"
                    name="details"
                    defaultValue={attrs.details}
                />
            </Modal>
            );
    }
});

module.exports = AreaFormModal;


