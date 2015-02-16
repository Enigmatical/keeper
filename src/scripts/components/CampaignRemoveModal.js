'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Modal = require('./ModelRemoveModal');



var CampaignRemoveModal = React.createClass({
    render: function () {
        return (
            <Modal
                titlePart="Campaign"
                target={this.props.campaign}

                className={this.props.className}
                onUpdate={this.props.onUpdate}
            >
                <p className="text-danger">
                    This will also <strong>remove</strong> all associated:
                    <ul className="text-danger">
                        <li>Acts</li>
                        <li>Quests</li>
                        <li>Tasks</li>
                        <li>Locations</li>
                        <li>Bounties</li>
                    </ul>
                </p>
            </Modal>
            );
    }
});

module.exports = CampaignRemoveModal;


