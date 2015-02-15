'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Modal = require('./ModelRemoveModal');



var ActRemoveModal = React.createClass({
    render: function () {
        var message = (
            <div>
                <p className="text-danger">
                This will also <strong>remove</strong> all associated:
                    <ul className="text-danger">
                        <li>Quests</li>
                        <li>Tasks</li>
                    </ul>
                </p>
            </div>
            );

        return (
            <Modal
                titlePart="Campaign"
                target={this.props.act}
                targetTitle={this.props.act.attrs.title}

                message={message}

                className={this.props.className}
                onUpdate={this.props.onUpdate}
            />
            );
    }
});

module.exports = ActRemoveModal;


