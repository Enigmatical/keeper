'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Modal = require('./ModelRemoveModal');



var TaskRemoveModal = React.createClass({
    render: function () {
        var message = (<span />);

        return (
            <Modal
                titlePart="Task"
                target={this.props.task}
                targetTitle={this.props.task.attrs.objective}

                message={message}

                className={this.props.className}
                onUpdate={this.props.onUpdate}
            />
            );
    }
});

module.exports = TaskRemoveModal;


