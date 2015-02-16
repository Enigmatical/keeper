'use strict';

var React = require('react/addons');
var Router = require('react-router');

var Auth = require('../helpers/Auth');

var CampaignModel = require('../models/CampaignModel');

var MainBreadcrumb = require('./MainBreadcrumb');
var ActFormModal = require('./ActFormModal');
var ActCard = require('./ActCard');



var ActManagePage = React.createClass({
    mixins: [Auth, Router.State],

    getInitialState: function() {
        return {
            campaign: null,
            acts: []
        }
    },

    componentWillMount: function() {
        var self = this;

        var campaignId = self.getParams().campaignId;

        new CampaignModel().get(campaignId)
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
                <div id="act-manage-page" className="page-content">
                    <MainBreadcrumb crumbs={[
                        {
                            text: self.state.campaign.attrs.title
                        }
                    ]} />
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="page-header">
                                {self.state.campaign.attrs.title}&nbsp;&nbsp;<small>{self.state.campaign.attrs.subtitle}</small>
                                <ActFormModal className="pull-right" campaign={self.state.campaign} onUpdate={self.getActs} />
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
                <div id="act-manage-page" className="page-content"></div>
                );
        }
    }
});

module.exports = ActManagePage;


