'use strict';

var React = require('react/addons');
var _ = require('lodash');

var AreaModel = require('../models/AreaModel');

var Modal = require('./ModelFormModal');
var Input = require('./ModelFormInput');



var AreaFormModal = React.createClass({
    render: function () {

        var area = _.isObject(this.props.area) ? this.props.area : undefined;
        var attrs = _.isObject(area) ? area.attrs : {};

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
                titlePart="Area"
                model={AreaModel}

                target={area}
                related={this.props.location}
                relatedKey="location_id"

                inputs={inputs}

                className={this.props.className}
                onUpdate={this.props.onUpdate}
            />
            );
    }
});

module.exports = AreaFormModal;


