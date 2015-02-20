'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Modal = require('../ModelRemoveModal');



var BountyRemoveModal = React.createClass({
    render: function () {
        return (
            <Modal
                titlePart="Bounty"
                target={this.props.bounty}

                className={this.props.className}
                onUpdate={this.props.onUpdate}
            />
            );
    }
});

module.exports = BountyRemoveModal;


