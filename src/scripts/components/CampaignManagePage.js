'use strict';

var React = require('react/addons');

var Auth = require('../helpers/Auth');

var Breadcrumb = require('./MainBreadcrumb');
var PageHeader = require('./ModelPageHeader');
var FormModal = require('./CampaignFormModal');
var Card = require('./CampaignCard');



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

    render: function () {
        var self = this;

        return (
            <div id="campaign-manage-page" className="page-content">
                <Breadcrumb />
                <PageHeader pageName="Campaigns">
                    <FormModal onUpdate={self.getCampaigns} />
                </PageHeader>
                <div className="row">
                    {self.state.campaigns.map(function(campaign) {
                        return (
                            <div key={campaign.id} className="col-md-6">
                                <Card campaign={campaign} onUpdate={self.getCampaigns} />
                            </div>
                            );
                    })}
                </div>
            </div>
            );
    }
});

module.exports = CampaignManagePage;