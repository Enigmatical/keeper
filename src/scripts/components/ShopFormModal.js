'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Model = require('../models/ShopModel');

var Modal = require('./ModelFormModal');
var Input = require('./ModelFormInput');



var ShopFormModal = React.createClass({
    render: function () {
        var shop = _.isObject(this.props.shop) ? this.props.shop : undefined;
        var attrs = _.isObject(shop) ? shop.attrs : {};

        return (
            <Modal
                titlePart="Shop"
                model={Model}
    
                target={shop}
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
                    type="text"
                    name="quality"
                    defaultValue={attrs.quality}
                />
                <Input
                    type="text"
                    name="shopkeeper"
                    defaultValue={attrs.shopkeeper}
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

module.exports = ShopFormModal;


