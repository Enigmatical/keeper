'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Pathfinder = require('../../helpers/Pathfinder');

var Model = require('../../models/ShopModel');

var Modal = require('../Model/FormModal');
var Input = require('../Model/FormInput');



var ShopFormModal = React.createClass({
    render: function () {
        var shop = _.isObject(this.props.shop) ? this.props.shop : undefined;
        var attrs = _.isObject(shop) ? shop.attrs : {};

        var typeOptions = Pathfinder.getShopTypeOptions();
        var qualityOptions = Pathfinder.getShopModifierOptions();

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

                <div className="row">
                    <div className="col-md-6">
                        <Input
                            type="select"
                            name="type"
                            defaultValue={attrs.type}
                            options={typeOptions}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            type="select"
                            name="quality"
                            defaultValue={attrs.quality}
                            options={qualityOptions}
                        />
                    </div>
                </div>

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


