'use strict';

var React = require('react/addons');

var Modal = require('../Model/UnlinkModal');



var CharacterRemoveModal = React.createClass({
    render: function () {
        return (
            <Modal
                titlePart={this.props.name || "Character"}

                target={this.props.target}
                index={this.props.index}
                className={this.props.className}
                onUpdate={this.props.onUpdate}
            />
            );
    }
});

module.exports = CharacterRemoveModal;


