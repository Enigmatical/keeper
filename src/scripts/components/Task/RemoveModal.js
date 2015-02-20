'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Modal = require('../ModelRemoveModal');



var TaskRemoveModal = React.createClass({
    render: function () {
        return (
            <Modal
                titlePart="Task"
                target={this.props.task}

                className={this.props.className}
                onUpdate={this.props.onUpdate}
            />
            );
    }
});

module.exports = TaskRemoveModal;


