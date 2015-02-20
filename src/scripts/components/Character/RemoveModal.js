'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Modal = require('../Model/RemoveModal');



var CharacterRemoveModal = React.createClass({
    render: function () {
        return (
            <Modal
                titlePart="Character"
                target={this.props.character}

                className={this.props.className}
                onUpdate={this.props.onUpdate}
            />
            );
    }
});

module.exports = CharacterRemoveModal;


