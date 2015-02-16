'use strict';

var React = require('react/addons');

var Auth = require('../helpers/Auth');

var CampaignFormModal = require('./CampaignFormModal');

var CampaignCard = require('./CampaignCard');



var CampaignManagePage = React.createClass({
    mixins: [Auth],

    getInitialState: function() {
        return {
            campaigns: []
        }
    },

    getCampaigns: function() {
        var self = this;

        Auth.User.getCampaigns().then(function(campaigns) {
            self.setState({campaigns: campaigns});
        });
    },

    componentWillMount: function() {
        this.getCampaigns();
    },

    render: function () {
        var self = this;

        return (
            <div id="campaign-manage-page" className="page-content">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="page-header">
                            Campaigns
                            <CampaignFormModal className="pull-right" onUpdate={self.getCampaigns} />
                        </h1>
                    </div>
                </div>
                <div className="row">
                    {self.state.campaigns.map(function(campaign, index) {
                        return (
                            <div key={campaign.id} className="col-md-6">
                                <CampaignCard index={index} campaign={campaign} onUpdate={self.getCampaigns} />
                            </div>
                            );
                    })}
                </div>
            </div>
            );
    }
});

module.exports = CampaignManagePage;


