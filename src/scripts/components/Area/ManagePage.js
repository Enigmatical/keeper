'use strict';

var React = require('react/addons');
var Router = require('react-router');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var TabbedArea = require('react-bootstrap').TabbedArea;
var TabPane = require('react-bootstrap').TabPane;

var Auth = require('../../helpers/Auth');

var CampaignModel = require('../../models/CampaignModel');
var LocationModel = require('../../models/LocationModel');

var Breadcrumb = require('../MainBreadcrumb');
var PageHeader = require('../ModelPageHeader');
var AreaFormModal = require('./FormModal');
var AreaCard = require('./Card');
var ShopFormModal = require('../Shop/FormModal');
var ShopCard = require('../Shop/Card');
var BountyFormModal = require('../Bounty/FormModal');
var BountyCard = require('../Bounty/Card');



var AreaManagePage = React.createClass({
    mixins: [Auth, Router.State],

    getInitialState: function() {
        return {
            campaign: null,
            location: null,
            areas: [],
            shops: [],
            bounties: [],
            activeTab: 1
        }
    },

    componentWillMount: function() {
        var self = this;

        var campaignId = self.getParams().campaignId;
        var locationId = self.getParams().locationId;

        new CampaignModel().get(campaignId)
            .then(function(campaign) {
                self.setState({campaign: campaign});

                new LocationModel().get(locationId)
                    .then(function(location) {
                        self.setState({location: location});
                        self.getAreas(false);
                        self.getShops(false);
                        self.getBounties(false);
                    });
            });
    },

    getAreas: function(setTab) {
        if (setTab === undefined) {
            setTab = true;
        }

        var self = this;
        var location = this.state.location;

        location.getAreas()
            .then(function(areas) {
                self.setState({areas: areas});
                if (setTab) {
                    self.setState({activeTab: 1});
                }
            });
    },

    getShops: function(setTab) {
        if (setTab === undefined) {
            setTab = true;
        }

        var self = this;
        var location = this.state.location;

        location.getShops()
            .then(function(shops) {
                self.setState({shops: shops});
                if (setTab) {
                    self.setState({activeTab: 2});
                }
            });
    },

    getBounties: function(setTab) {
        if (setTab === undefined) {
            setTab = true;
        }

        var self = this;
        var location = this.state.location;

        location.getBounties()
            .done(function(bounties) {
                self.setState({bounties: bounties});
                if (setTab) {
                    self.setState({activeTab: 3});
                }
            });
    },

    handleTabs: function(selectedKey) {
        this.setState({activeTab: selectedKey});
    },

    render: function () {
        var self = this;
        var campaign = this.state.campaign;
        var location = this.state.location;

        if (_.isObject(location)) {
            return (
                <div id="area-manage-page" className="page-content">
                    <Breadcrumb crumbs={[
                        {
                            text: campaign.attrs.name + " (Locations)",
                            link: 'manage-locations',
                            params: {campaignId: campaign.id}
                        },
                        {
                            text: location.attrs.name
                        }
                    ]} />
                    <PageHeader pageName={location.attrs.name} pageType="Areas, Shops, & Bounties">
                        <AreaFormModal location={location} onUpdate={self.getAreas} />
                        <ShopFormModal location={location} onUpdate={self.getShops} />
                        <BountyFormModal location={location} onUpdate={self.getBounties} />
                    </PageHeader>
                   <div className="row">
                        <div className="col-md-12">
                            <TabbedArea activeKey={this.state.activeTab} onSelect={this.handleTabs}>
                                <TabPane eventKey={1} tab="Areas">
                                    {self.state.areas.map(function(area) {
                                        return (
                                            <div key={area.id} className="col-md-6">
                                                <AreaCard location={location} area={area} onUpdate={self.getAreas} />
                                            </div>
                                            );
                                    })}
                                </TabPane>
                                <TabPane eventKey={2} tab="Shops">
                                    {self.state.shops.map(function(shop) {
                                        return (
                                            <div key={shop.id} className="col-md-6">
                                                <ShopCard location={location} shop={shop} onUpdate={self.getShops} />
                                            </div>
                                            );
                                    })}
                                </TabPane>
                                <TabPane eventKey={3} tab="Bounties">
                                    {self.state.bounties.map(function(bounty) {
                                        return (
                                            <div key={bounty.id} className="col-md-6">
                                                <BountyCard location={location} bounty={bounty} onUpdate={self.getBounties} />
                                            </div>
                                            );
                                    })}
                                </TabPane>
                            </TabbedArea>
                        </div>
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

module.exports = AreaManagePage;


