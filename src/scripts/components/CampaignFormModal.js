'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Auth = require('../helpers/Auth');

var CampaignModel = require('../models/CampaignModel');

var Modal = require('./ModelFormModal');
var Input = require('./ModelFormInput');



var CampaignFormModal = React.createClass({
    render: function() {
        var campaign = _.isObject(this.props.campaign) ? this.props.campaign : undefined;
        var attrs = _.isObject(campaign) ? campaign.attrs : {};

        var inputs = (
            <div>
                <Input
                    type="text"
                    name="title"
                    defaultValue={attrs.title}
                />
                <Input
                    type="text"
                    name="subtitle"
                    placeholder="Sub-Title"
                    defaultValue={attrs.subtitle}
                />
                <Input
                    type="textarea"
                    name="summary"
                    defaultValue={attrs.summary}
                />
                <Input
                    type="text"
                    name="order"
                    placeholder="Sort Order"
                    defaultValue={attrs.order}
                />
            </div>
            );

        return (
            <Modal
                titlePart="Campaign"
                model={CampaignModel}

                target={campaign}
                related={Auth.User}
                relatedKey="user_id"

                inputs={inputs}

                className={this.props.className}
                onUpdate={this.props.onUpdate}
            />
            );
    }
});

module.exports = CampaignFormModal;


