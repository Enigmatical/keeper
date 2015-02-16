'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Modal = require('./ModelRemoveModal');



var LocationRemoveModal = React.createClass({
    render: function () {
        var message = (
            <div>
                <p className="text-danger">
                This will also <strong>remove</strong> all associated:
                    <ul className="text-danger">
                        <li>Areas</li>
                        <li>Shops</li>
                    </ul>
                </p>
            </div>
            );

        return (
            <Modal
            titlePart="Location"
            target={this.props.location}
            targetTitle={this.props.location.attrs.title}

            message={message}

            className={this.props.className}
            onUpdate={this.props.onUpdate}
            />
            );
    }
});

module.exports = LocationRemoveModal;


