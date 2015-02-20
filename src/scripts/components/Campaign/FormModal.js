'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Auth = require('../../helpers/Auth');

var Model = require('../../models/CampaignModel');

var Modal = require('../ModelFormModal');
var Input = require('../ModelFormInput');



var CampaignFormModal = React.createClass({
    render: function() {
        var campaign = _.isObject(this.props.campaign) ? this.props.campaign : undefined;
        var attrs = _.isObject(campaign) ? campaign.attrs : {};

        return (
            <Modal
                titlePart="Campaign"
                model={Model}

                target={campaign}
                related={Auth.User}
                relatedKey="user_id"

                className={this.props.className}
                onUpdate={this.props.onUpdate}
            >
                <Input
                    type="text"
                    name="name"
                    defaultValue={attrs.name}
                />

                <Input
                    type="textarea"
                    name="details"
                    defaultValue={attrs.details}
                />

                <Input
                    type="textarea"
                    name="flavor"
                    defaultValue={attrs.flavor}
                />
            </Modal>
            );
    }
});

module.exports = CampaignFormModal;


