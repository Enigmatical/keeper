'use strict';

var React = require('react/addons');
var Router = require('react-router');

var Auth = require('../helpers/Auth');

var CampaignModel = require('../models/CampaignModel');

var MainBreadcrumb = require('./MainBreadcrumb');
var LocationFormModal = require('./LocationFormModal');
var LocationCard = require('./LocationCard');



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

        if (_.isObject(self.state.campaign)) {
            return (
                <div id="location-manage-page" className="page-content">
                    <MainBreadcrumb crumbs={[
                        {
                            text: self.state.campaign.attrs.title
                        }
                    ]} />
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="page-header">
                                {self.state.campaign.attrs.title}&nbsp;&nbsp;<small>{self.state.campaign.attrs.subtitle}</small>
                                <LocationFormModal className="pull-right" campaign={self.state.campaign} onUpdate={self.getLocations} />
                            </h1>
                        </div>
                    </div>
                    <div className="row">
                        {self.state.locations.map(function(location) {
                            return (
                                <div key={location.id} className="col-md-6">
                                    <LocationCard campaign={self.state.campaign} location={location} onUpdate={self.getLocations} />
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