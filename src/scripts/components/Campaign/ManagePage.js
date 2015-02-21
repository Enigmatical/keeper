'use strict';

var React = require('react/addons');

var Auth = require('../../helpers/Auth');

var Breadcrumb = require('../Common/Breadcrumb');
var PageHeader = require('../Model/PageHeader');
var FormModal = require('../Model/FormModal');
var Input = require('../Model/FormInput');

var Model = require('../../models/CampaignModel');
var Card = require('./Card');



var CampaignManagePage = React.createClass({
    mixins: [Auth],

    getInitialState: function() {
        return {
            campaigns: []
        }
    },

    componentWillMount: function() {
        this.getCampaigns();
    },

    getCampaigns: function() {
        var self = this;

        Auth.User.getCampaigns().then(function(campaigns) {
            self.setState({campaigns: campaigns});
        });
    },

    getCampaignInputs: function(attrs) {
        return (
            <div>
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
            </div>
            );
    },

    render: function () {
        var self = this;

        return (
            <div id="campaign-manage-page" className="page-content">
                <Breadcrumb />
                <PageHeader pageName="Campaigns">
                    <FormModal model={Model} related={{key: 'user_id', on: Auth.User}} inputs={self.getCampaignInputs.bind(self, {})} onUpdate={self.getCampaigns} />
                </PageHeader>
                <div className="row">
                    {self.state.campaigns.map(function(campaign) {
                        return (
                            <div key={campaign.id} className="col-md-6">
                                <Card model={Model} campaign={campaign} inputs={self.getCampaignInputs.bind(self, campaign.attrs)} onUpdate={self.getCampaigns} />
                            </div>
                            );
                    })}
                </div>
            </div>
            );
    }
});

module.exports = CampaignManagePage;