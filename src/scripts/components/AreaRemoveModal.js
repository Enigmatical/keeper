'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Modal = require('./ModelRemoveModal');



var AreaRemoveModal = React.createClass({
    render: function () {
        var message = (
            <span />
            );

        return (
            <Modal
                titlePart="Area"
                target={this.props.area}
                targetTitle={this.props.area.attrs.name}

                message={message}

                className={this.props.className}
                onUpdate={this.props.onUpdate}
            />
            );
    }
});

module.exports = AreaRemoveModal;


