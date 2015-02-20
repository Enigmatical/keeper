'use strict';

var React = require('react/addons');
var Router = require('react-router');

var Auth = require('../helpers/Auth');

var CampaignModel = require('../models/CampaignModel');

var Breadcrumb = require('./MainBreadcrumb');
var PageHeader = require('./ModelPageHeader');
var FormModal = require('./LocationFormModal');
var Card = require('./LocationCard');



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

    render: function () {
        var self = this;
        var campaign = self.state.campaign;

        if (_.isObject(self.state.campaign)) {
            return (
                <div id="location-manage-page" className="page-content">
                    <Breadcrumb crumbs={[
                        {
                            text: campaign.attrs.name + " (Locations)"
                        }
                    ]} />
                    <PageHeader pageName={campaign.attrs.name} pageType="Locations">
                        <FormModal className="pull-right" campaign={self.state.campaign} onUpdate={self.getLocations} />
                    </PageHeader>
                    <div className="row">
                        {self.state.locations.map(function(location) {
                            return (
                                <div key={location.id} className="col-md-6">
                                    <Card campaign={campaign} location={location} onUpdate={self.getLocations} />
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