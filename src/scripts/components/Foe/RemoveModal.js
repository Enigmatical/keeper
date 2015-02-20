'use strict';

var React = require('react/addons');

var Modal = require('../Model/RemoveModal');



var FoeRemoveModal = React.createClass({
    render: function () {
        return (
            <Modal
                titlePart="Foe"
                target={this.props.foe}

                className={this.props.className}
                onUpdate={this.props.onUpdate}
            />
            );
    }
});

module.exports = FoeRemoveModal;


