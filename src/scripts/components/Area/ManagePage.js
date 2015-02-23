'use strict';

var React = require('react/addons');
var Router = require('react-router');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var ButtonGroup = require('react-bootstrap').ButtonGroup;
var TabbedArea = require('react-bootstrap').TabbedArea;
var TabPane = require('react-bootstrap').TabPane;

var Auth = require('../../helpers/Auth');
var Pathfinder = require('../../helpers/Pathfinder');

var CampaignModel = require('../../models/CampaignModel');
var LocationModel = require('../../models/LocationModel');

var Breadcrumb = require('../Common/Breadcrumb');
var PageHeader = require('../Model/PageHeader');
var FormModal = require('../Model/FormModal');
var Input = require('../Model/FormInput');

var AreaModel = require('../../models/AreaModel');
var AreaCard = require('./Card');

var ShopModel = require('../../models/ShopModel');
var ShopCard = require('../Shop/Card');

var BountyModel = require('../../models/BountyModel');
var BountyCard = require('../Bounty/Card');
var BountyInputs = require('../Bounty/Inputs');



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

    getAreaInputs: function(attrs) {
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
                    name="flavor"
                    defaultValue={attrs.flavor}
                />
                <Input
                    type="textarea"
                    name="details"
                    defaultValue={attrs.details}
                />
            </div>
            );
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

    getShopInputs: function(attrs) {
        return (
            <div>
                <Input
                    type="text"
                    name="name"
                    defaultValue={attrs.name}
                />

                <div className="row">
                    <div className="col-md-6">
                        <Input
                            type="select"
                            name="type"
                            defaultValue={attrs.type}
                            options={Pathfinder.getShopTypeOptions()}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            type="select"
                            name="quality"
                            defaultValue={attrs.quality}
                            options={Pathfinder.getShopModifierOptions()}
                        />
                    </div>
                </div>

                <Input
                    type="textarea"
                    name="flavor"
                    defaultValue={attrs.flavor}
                />
                <Input
                    type="textarea"
                    name="details"
                    defaultValue={attrs.details}
                />
            </div>
            );
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

    getBountyInputs: function(attrs) {
        return(
            <BountyInputs attrs={attrs} />
            );
    },

    handleTabs: function(selectedKey) {
        this.setState({activeTab: selectedKey});
    },

    render: function () {
        var self = this;
        var campaign = this.state.campaign;
        var location = this.state.location;

        if (_.isObject(location)) {
            var crumbs = [
                {
                    text: (<span>Campaign: <strong>{campaign.attrs.name}</strong></span>),
                    link: 'manage-campaigns'
                },
                {
                    text: (<span>Location: <strong>{location.attrs.name}</strong></span>),
                    link: 'manage-locations',
                    params: {campaignId: campaign.id}
                },
                {
                    text: (<span>Areas, Shops, &amp; Bounties</span>)
                }
            ];

            return (
                <div id="area-manage-page" className="page-content">
                    <Breadcrumb crumbs={crumbs} />
                    <PageHeader pageName={location.attrs.name} pageType="Areas, Shops, & Bounties">
                        <FormModal model={AreaModel} parent={location} inputs={self.getAreaInputs.bind(self, {})} onUpdate={self.getAreas} />
                        <FormModal model={ShopModel} parent={location} inputs={self.getShopInputs.bind(self, {})} onUpdate={self.getShops} />
                        <FormModal model={BountyModel} parent={location} inputs={self.getBountyInputs.bind(self, {})} onUpdate={self.getBounties} />
                    </PageHeader>
                   <div className="row">
                        <div className="col-md-12">
                            <TabbedArea activeKey={this.state.activeTab} onSelect={this.handleTabs}>
                                <TabPane eventKey={1} tab="Areas">
                                    {self.state.areas.map(function(area) {
                                        return (
                                            <div key={area.id} className="col-md-6">
                                                <AreaCard model={AreaModel} campaign={campaign} location={location} area={area} inputs={self.getAreaInputs.bind(self, area.attrs)} onUpdate={self.getAreas} />
                                            </div>
                                            );
                                    })}
                                </TabPane>
                                <TabPane eventKey={2} tab="Shops">
                                    {self.state.shops.map(function(shop) {
                                        return (
                                            <div key={shop.id} className="col-md-6">
                                                <ShopCard model={ShopModel} campaign={campaign} location={location} shop={shop} inputs={self.getShopInputs.bind(self, shop.attrs)} onUpdate={self.getShops} />
                                            </div>
                                            );
                                    })}
                                </TabPane>
                                <TabPane eventKey={3} tab="Bounties">
                                    {self.state.bounties.map(function(bounty) {
                                        return (
                                            <div key={bounty.id} className="col-md-6">
                                                <BountyCard model={BountyModel} campaign={campaign} location={location} bounty={bounty} inputs={self.getBountyInputs.bind(self, bounty.attrs)} onUpdate={self.getBounties} />
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


