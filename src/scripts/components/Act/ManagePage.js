'use strict';

var React = require('react/addons');
var Router = require('react-router');

var Auth = require('../../helpers/Auth');

var ActModel = require('../../models/ActModel');
var CampaignModel = require('../../models/CampaignModel');

var Breadcrumb = require('../Common/Breadcrumb');
var PageHeader = require('../Model/PageHeader');
var FormModal = require('../Model/FormModal');
var Input = require('../Model/FormInput');
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

    getInputs: function(attrs) {
        return(
            <div>
                <Input
                    type="text"
                    name="name"
                    defaultValue={attrs.name}
                />
                <Input
                    type="text"
                    name="type"
                    defaultValue={attrs.type}
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
        var campaign = self.state.campaign;

        if (_.isObject(campaign)) {
            var crumbs = [
                {
                    text: (<span>Campaign: <strong>{campaign.attrs.name}</strong></span>),
                    link: 'manage-campaigns'
                },
                {
                    text: (<span>Acts</span>)
                }
            ];

            return (
                <div id="act-manage-page" className="page-content">
                    <Breadcrumb crumbs={crumbs} />
                    <PageHeader pageName={campaign.attrs.name} pageType="Acts">
                        <FormModal model={ActModel} parent={campaign} inputs={self.getInputs.bind({})} onUpdate={self.getActs} />
                    </PageHeader>
                    <div className="row">
                        {self.state.acts.map(function(act) {
                            return (
                                <div key={act.id} className="col-md-6">
                                    <Card model={ActModel} campaign={campaign} act={act} inputs={self.getInputs.bind(self, act.attrs)} onUpdate={self.getActs} />
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


