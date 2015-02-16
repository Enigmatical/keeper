'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Modal = require('./ModelRemoveModal');



var ShopRemoveModal = React.createClass({
    render: function () {
        var message = (
            <span />
            );

        return (
            <Modal
                titlePart="Shop"
                target={this.props.shop}
                targetTitle={this.props.shop.attrs.name}

                message={message}

                className={this.props.className}
                onUpdate={this.props.onUpdate}
            />
            );
    }
});

module.exports = ShopRemoveModal;


