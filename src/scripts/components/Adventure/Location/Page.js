'use strict';

var React = require('react/addons');
var Router = require('react-router');

var Auth = require('../../../helpers/Auth');

var CampaignModel = require('../../../models/CampaignModel');
var SaveModel = require('../../../models/SaveModel');

var LocationModel = require('../../../models/LocationModel');

var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var PageHeader = require('../PageHeader');
var Breadcrumb = require('../../Common/Breadcrumb');

var Card = require('../Card');
var LocationInfo = require('./Info');


var LocationAdventurePage = React.createClass({
    mixins: [Auth, Router.State],

    getInitialState: function() {
        return {
            campaign: null,
            save: null,
            locations: []
        }
    },

    componentWillMount: function() {
        var self = this;

        var campaignId = self.getParams().campaignId;
        var saveId = self.getParams().saveId;

        new CampaignModel().get(campaignId)
            .done(function(campaign) {
                new SaveModel().get(saveId)
                    .done(function(save) {
                        save.getJoins()
                            .done(function() {
                                self.setState({
                                    campaign: campaign,
                                    save: save
                                });
                                self.getLocations();
                            });
                    });
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

    getInfo: function(target) {
        return (<LocationInfo target={target} />);
    },

    render: function () {
        var self = this;
        var campaign = self.state.campaign;
        var save = self.state.save;

        if (_.isObject(campaign)) {
            var crumbs = [
                {
                    text: 'Locations'
                }
            ];

            return (
                <div id="location-adventure-page" className="page-content">
                    <PageHeader campaign={campaign} save={save} section="map" />
                    <Breadcrumb className="breadcrumb-adventure" crumbs={crumbs} />
                    <div className="row">
                        {self.state.locations.map(function(location) {
                            var leftButtons = [
                                (<ButtonLink key="button-link" bsStyle="primary" to="adventure-areas" params={{campaignId: campaign.id, saveId: save.id, locationId: location.id}}><Glyphicon glyph="play" /> Areas, Shops, &amp; Bounties</ButtonLink>)
                            ];
                            return (
                                <div key={location.id} className="col-md-12">
                                    <Card model={LocationModel} target={location} leftButtons={leftButtons} getInfo={self.getInfo.bind(self, location)} />
                                </div>
                                );
                        })}
                    </div>
                </div>
                );
        }
        else {
            return (
                <div id="location-adventure-page" className="page-content"></div>
                );
        }
    }
});

module.exports = LocationAdventurePage;