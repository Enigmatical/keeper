'use strict';

var React = require('react/addons');
var Router = require('react-router');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var TabbedArea = require('react-bootstrap').TabbedArea;
var TabPane = require('react-bootstrap').TabPane;

var Auth = require('../helpers/Auth');

var CampaignModel = require('../models/CampaignModel');
var LocationModel = require('../models/LocationModel');

var MainBreadcrumb = require('./MainBreadcrumb');
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
                        self.getAreas();
                        self.getShops();
                    });
            });
    },

    getAreas: function() {
        var self = this;
        var location = this.state.location;

        location.getAreas()
            .then(function(areas) {
                self.setState({areas: areas, activeTab: 1});
            });
    },

    getShops: function() {
        var self = this;
        var location = this.state.location;

        location.getShops()
            .then(function(shops) {
                self.setState({shops: shops, activeTab: 2});
            });
    },

    handleTabs: function(selectedKey) {
        this.setState({activeTab: selectedKey});
    },

    render: function () {
        var self = this;

        if (_.isObject(self.state.location)) {
            return (
                <div id="area-manage-page" className="page-content">
                    <MainBreadcrumb crumbs={[
                        {
                            text: self.state.campaign.attrs.title,
                            link: 'manage-locations',
                            params: {campaignId:self.state.campaign.id}
                        },
                        {
                            text: self.state.location.attrs.name
                        }
                    ]} />
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="page-header">
                                {self.state.location.attrs.name}&nbsp;&nbsp;<small>{self.state.location.attrs.category}</small>
                                <ButtonToolbar className="pull-right">
                                    <AreaFormModal location={self.state.location} onUpdate={self.getAreas} />
                                    <ShopFormModal location={self.state.location} onUpdate={self.getShops} />
                                </ButtonToolbar>
                            </h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <TabbedArea activeKey={this.state.activeTab} onSelect={this.handleTabs}>
                                <TabPane eventKey={1} tab="Areas">
                                    {self.state.areas.map(function(area) {
                                        return (
                                            <div key={area.id} className="col-md-6">
                                                <AreaCard location={self.state.location} area={area} onUpdate={self.getAreas} />
                                            </div>
                                            );
                                    })}
                                </TabPane>
                                <TabPane eventKey={2} tab="Shops">
                                    {self.state.shops.map(function(shop) {
                                        return (
                                            <div key={shop.id} className="col-md-6">
                                                <ShopCard location={self.state.location} shop={shop} onUpdate={self.getShops} />
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


