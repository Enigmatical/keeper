'use strict';

var React = require('react/addons');
var Router = require('react-router');

var Auth = require('../../helpers/Auth');

var CampaignModel = require('../../models/CampaignModel');

var Breadcrumb = require('../Common/Breadcrumb');
var PageHeader = require('../Model/PageHeader');
var FormModal = require('./FormModal');
var Card = require('./Card');



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
        var campaign = self.state.campaign;

        if (_.isObject(campaign)) {
            return (
                <div id="act-manage-page" className="page-content">
                    <Breadcrumb crumbs={[
                        {
                            text: campaign.attrs.name + " (Acts)"
                        }
                    ]} />
                    <PageHeader pageName={campaign.attrs.name} pageType="Acts">
                        <FormModal campaign={campaign} onUpdate={self.getActs} />
                    </PageHeader>
                    <div className="row">
                        {self.state.acts.map(function(act) {
                            return (
                                <div key={act.id} className="col-md-6">
                                    <Card campaign={campaign} act={act} onUpdate={self.getActs} />
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


