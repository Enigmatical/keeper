'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Modal = require('./ModelRemoveModal');



var CampaignRemoveModal = React.createClass({
    render: function () {
        var message = (
            <div>
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
            </div>
            );

        return (
            <Modal
                titlePart="Campaign"
                target={this.props.campaign}
                targetTitle={this.props.campaign.attrs.title}

                message={message}

                className={this.props.className}
                onUpdate={this.props.onUpdate}
            />
            );
    }
});

module.exports = CampaignRemoveModal;


