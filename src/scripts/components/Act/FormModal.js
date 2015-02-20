'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Model = require('../../models/ActModel');

var Modal = require('../Model/FormModal');
var Input = require('../Model/FormInput');



var ActFormModal = React.createClass({
    render: function () {
    var act = _.isObject(this.props.act) ? this.props.act : undefined;
    var attrs = _.isObject(act) ? act.attrs : {};

    return (
        <Modal
            titlePart="Act"
            model={Model}

            target={act}
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
        </Modal>
        );
    }
});

module.exports = ActFormModal;