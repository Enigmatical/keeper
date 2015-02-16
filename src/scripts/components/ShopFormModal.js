'use strict';

var React = require('react/addons');
var _ = require('lodash');

var ShopModel = require('../models/ShopModel');

var Modal = require('./ModelFormModal');
var Input = require('./ModelFormInput');



var ShopFormModal = React.createClass({
    render: function () {

        var shop = _.isObject(this.props.shop) ? this.props.shop : undefined;
        var attrs = _.isObject(shop) ? shop.attrs : {};

        var inputs = (
            <div>
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
                    name="category"
                    defaultValue={attrs.category}
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
                titlePart="Shop"
                model={ShopModel}
    
                target={shop}
                related={this.props.location}
                relatedKey="location_id"
    
                inputs={inputs}
    
                className={this.props.className}
                onUpdate={this.props.onUpdate}
            />
            );
    }
});

module.exports = ShopFormModal;


