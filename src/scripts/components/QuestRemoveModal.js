'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Modal = require('./ModelRemoveModal');



var QuestRemoveModal = React.createClass({
    render: function () {
        var message = (
            <div>
                <p className="text-danger">
                This will also <strong>remove</strong> all associated:
                    <ul className="text-danger">
                        <li>Tasks</li>
                    </ul>
                </p>
            </div>
            );

        return (
            <Modal
                titlePart="Quest"
                target={this.props.quest}
                targetTitle={this.props.quest.attrs.title}

                message={message}

                className={this.props.className}
                onUpdate={this.props.onUpdate}
            />
            );
    }
});

module.exports = QuestRemoveModal;