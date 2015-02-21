'use strict';

var React = require('react/addons');
var Router = require('react-router');

var Auth = require('../../helpers/Auth');

var CampaignModel = require('../../models/CampaignModel');

var Breadcrumb = require('../Common/Breadcrumb');
var PageHeader = require('../Model/PageHeader');
var FormModal = require('../Model/FormModal');
var Input = require('../Model/FormInput');

var Model = require('../../models/LocationModel');
var Card = require('./Card');



var LocationManagePage = React.createClass({
    mixins: [Auth, Router.State],

    getInitialState: function() {
        return {
            campaign: null,
            locations: []
        }
    },

    componentWillMount: function() {
        var self = this;

        var campaignId = self.getParams().campaignId;

        new CampaignModel().get(campaignId)
            .then(function(campaign) {
                self.setState({campaign: campaign});
                self.getLocations();
            });
    },

    getLocations: function() {
        var self = this;
        var campaign = this.state.campaign;

        campaign.getLocations()
            .then(function(locations) {
                self.setState({locations: locations});
            });
    },

    getLocationInputs: function(attrs) {
        return (
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
                <Input
                    type="text"
                    name="coordinate"
                    defaultValue={attrs.coordinate}
                />
            </div>
            );
    },

    render: function () {
        var self = this;
        var campaign = self.state.campaign;

        if (_.isObject(self.state.campaign)) {
            var crumbs = [
                {
                    text: (<span>Campaign: <strong>{campaign.attrs.name}</strong></span>),
                    link: 'manage-campaigns'
                },
                {
                    text: (<span>Locations</span>)
                }
            ];

            return (
                <div id="location-manage-page" className="page-content">
                    <Breadcrumb crumbs={crumbs} />
                    <PageHeader pageName={campaign.attrs.name} pageType="Locations">
                        <FormModal model={Model} related={{key: 'campaign_id', on: campaign}} inputs={self.getLocationInputs.bind(self, {})} onUpdate={self.getLocations} />
                    </PageHeader>
                    <div className="row">
                        {self.state.locations.map(function(location) {
                            return (
                                <div key={location.id} className="col-md-6">
                                    <Card model={Model} campaign={campaign} location={location} inputs={self.getLocationInputs.bind(self, location.attrs)} onUpdate={self.getLocations} />
                                </div>
                                );
                        })}
                    </div>
                </div>
                );
        }
        else {
            return (
                <div id="location-manage-page" className="page-content"></div>
                );
        }
    }
});

module.exports = LocationManagePage;