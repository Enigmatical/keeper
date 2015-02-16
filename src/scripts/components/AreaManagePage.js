'use strict';

var React = require('react/addons');
var Router = require('react-router');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var TabbedArea = require('react-bootstrap').TabbedArea;
var TabPane = require('react-bootstrap').TabPane;

var Auth = require('../helpers/Auth');

var CampaignModel = require('../models/CampaignModel');
var LocationModel = require('../models/LocationModel');

var Breadcrumb = require('./MainBreadcrumb');
var PageHeader = require('./ModelPageHeader');
var AreaFormModal = require('./AreaFormModal');
var AreaCard = require('./AreaCard');
var ShopFormModal = require('./ShopFormModal');
var ShopCard = require('./ShopCard');



var AreaManagePage = React.createClass({
    mixins: [Auth, Router.State],

    getInitialState: function() {
        return {
            campaign: null,
            location: null,
            areas: [],
            shops: [],
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
                            text: campaign.attrs.name,
                            link: 'manage-locations',
                            params: {campaignId: campaign.id}
                        },
                        {
                            text: location.attrs.name
                        }
                    ]} />
                    <PageHeader pageName={location.attrs.name} pageType="Areas & Shops">
                        <AreaFormModal location={location} onUpdate={self.getAreas} />
                        <ShopFormModal location={location} onUpdate={self.getShops} />
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


