'use strict';

var React = require('react/addons');

var Modal = require('./ModelUnlinkModal');



var FoeRemoveModal = React.createClass({
    render: function () {
        return (
            <Modal
                titlePart="Foe"

                target={this.props.target}
                index={this.props.index}
                className={this.props.className}
                onUpdate={this.props.onUpdate}
            />
            );
    }
});

module.exports = FoeRemoveModal;


