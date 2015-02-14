'use strict';

var React = require('react/addons');
var Router = require('react-router');
var Auth = require('../helpers/Auth');

var CampaignModel = require('../models/CampaignModel');

var CampaignBreadcrumb = require('./CampaignBreadcrumb');
var AddActModal = require('./AddActModal');
var ActCard = require('./ActCard');

require('../../styles/ManageCampaignPage.css');



var ManageCampaignPage = React.createClass({
    mixins: [Auth, Router.State],

    getInitialState: function() {
        return {
            campaign: null,
            acts: []
        }
    },

    componentWillMount: function() {
        var self = this;

        var campaign_id = self.getParams().campaignId;
        new CampaignModel().get(campaign_id)
            .then(function(campaign) {
                self.setState({campaign: campaign});
                self.getActs();
            });
    },

    getActs: function() {
        var self = this;
        var campaign = this.state.campaign;

        campaign.getActs()
            .then(function(acts) {
                self.setState({acts: acts});
            });
    },

    render: function () {
        var self = this;

        if (_.isObject(self.state.campaign)) {
            return (
                <div id="campaign-page" className="page-content">
                    <CampaignBreadcrumb campaign={this.state.campaign} />
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="page-header">
                                {self.state.campaign.attrs.title} <small>{self.state.campaign.attrs.subtitle}</small>
                                <AddActModal className="pull-right" editMode={false} campaign={self.state.campaign} onUpdate={self.getActs} />
                            </h1>
                        </div>
                    </div>
                    <div className="row">
                        {self.state.acts.map(function(act) {
                            return (
                                <div key={act.id} className="col-md-6">
                                    <ActCard campaign={self.state.campaign} act={act} onUpdate={self.getActs} />
                                </div>
                                );
                        })}
                    </div>
                </div>
                );
        }
        else {
            return (
                <div id="campaign-page" className="page-content"></div>
                );
        }
    }
});

module.exports = ManageCampaignPage;


