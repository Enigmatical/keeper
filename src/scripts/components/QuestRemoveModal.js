'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Modal = require('./ModelRemoveModal');



var QuestRemoveModal = React.createClass({
    render: function () {
        return (
            <Modal
                titlePart="Quest"
                target={this.props.quest}

                className={this.props.className}
                onUpdate={this.props.onUpdate}
            >
                <p className="text-danger">
                This will also <strong>remove</strong> all associated:
                    <ul className="text-danger">
                        <li>Tasks</li>
                    </ul>
                </p>
            </Modal>
            );
    }
});

module.exports = QuestRemoveModal;