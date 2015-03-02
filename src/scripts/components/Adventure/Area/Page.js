'use strict';

var React = require('react/addons');
var Router = require('react-router');

var Auth = require('../../../helpers/Auth');

var CampaignModel = require('../../../models/CampaignModel');
var SaveModel = require('../../../models/SaveModel');

var LocationModel = require('../../../models/LocationModel');
var AreaModel = require('../../../models/AreaModel');
var ShopModel = require('../../../models/ShopModel');
var BountyModel = require('../../../models/BountyModel');

var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;
var TabbedArea = require('react-bootstrap').TabbedArea;
var TabPane = require('react-bootstrap').TabPane;

var PageHeader = require('../PageHeader');
var Breadcrumb = require('../../Common/Breadcrumb');

var Card = require('../Card');
var AreaInfo = require('./Info');
var ShopInfo = require('../Shop/Info');
var BountyInfo = require('../Bounty/Info');


var AreaAdventurePage = React.createClass({
    mixins: [Auth, Router.State],

    getInitialState: function() {
        return {
            campaign: null,
            location: null,
            save: null,
            areas: [],
            shops: [],
            bounties: []
        }
    },

    componentWillMount: function() {
        var self = this;

        var campaignId = self.getParams().campaignId;
        var locationId = self.getParams().locationId;
        var saveId = self.getParams().saveId;

        new CampaignModel().get(campaignId)
            .done(function(campaign) {
                new LocationModel().get(locationId)
                    .done(function(location) {
                        new SaveModel().get(saveId)
                            .done(function(save) {
                                save.getJoins()
                                    .done(function() {
                                        self.setState({
                                            campaign: campaign,
                                            location: location,
                                            save: save
                                        });
                                        self.getAreas();
                                        self.getShops();
                                        self.getBounties();
                                    });
                            });
                    });
            });


    },

    getSave: function() {
        var self = this;
        var saveId = self.getParams().saveId;

        new SaveModel().get(saveId)
            .done(function(save) {
                save.getJoins()
                    .done(function() {
                        self.setState({save: save});
                    });
            });
    },

    getAreas: function() {
        var self = this;
        var location = this.state.location;

        location.getAreas()
            .then(function(areas) {
                self.setState({areas: areas});
            });
    },

    getAreaInfo: function(target) {
        return (<AreaInfo target={target} />);
    },

    getShops: function() {
        var self = this;
        var location = this.state.location;

        location.getShops()
            .done(function(shops) {
                self.setState({shops: shops});
            });
    },

    getShopInfo: function(target) {
        var save = this.state.save;

        return (<ShopInfo target={target} save={save} onSave={this.getSave} />);
    },

    getBounties: function() {
        var self = this;
        var location = this.state.location;

        location.getBounties()
            .done(function(bounties) {
                self.setState({bounties: bounties});
            });
    },

    getBountyInfo: function(target) {
        return (<BountyInfo target={target} />);
    },

    render: function () {
        var self = this;
        var campaign = self.state.campaign;
        var location = self.state.location;
        var save = self.state.save;

        if (_.isObject(location)) {
            var crumbs = [
                {
                    text: (<span>Location: <strong>{location.attrs.name}</strong></span>),
                    link: "adventure-locations",
                    params: {campaignId: campaign.id, saveId: save.id}
                },
                {
                    text: "Areas, Shops, & Bounties"
                }
            ];

            return (
                <div id="area-adventure-page" className="page-content">
                    <PageHeader campaign={campaign} save={save} section="map" />
                    <Breadcrumb className="breadcrumb-adventure" crumbs={crumbs} />
                    <div className="row">
                        <div className="col-md-12">
                            <TabbedArea activeKey={this.state.activeTab} onSelect={this.handleTabs}>
                                <TabPane eventKey={1} tab="Areas">
                                    {self.state.areas.map(function(area) {
                                        var leftButtons = [];

                                        return (
                                            <div key={area.id} className="col-md-12">
                                                <Card target={area} save={save} leftButtons={leftButtons} getInfo={self.getAreaInfo.bind(self, area)} onSave={self.getSave} />
                                            </div>
                                            );
                                    })}
                                </TabPane>
                                <TabPane eventKey={2} tab="Shops">
                                    {self.state.shops.map(function(shop) {
                                        var leftButtons = [];

                                        return (
                                            <div key={shop.id} className="col-md-12">
                                                <Card target={shop} save={save} type={<span><strong>{_.startCase(shop.attrs.type)}</strong> <small>{_.startCase(shop.attrs.quality)}</small></span>} leftButtons={leftButtons} getInfo={self.getShopInfo.bind(self, shop)} onSave={self.getSave} />
                                            </div>
                                            );
                                    })}
                                </TabPane>
                                <TabPane eventKey={3} tab="Bounties">
                                    {self.state.bounties.map(function(bounty) {
                                        var leftButtons = [
                                        ];

                                        return (
                                            <div key={bounty.id} className="col-md-12">
                                                <Card target={bounty} save={save} canComplete={true} type={<span><strong>{_.startCase(bounty.attrs.type)}</strong> <small>CR <strong>{bounty.attrs.challenge}</strong></small></span>} leftButtons={leftButtons} getInfo={self.getBountyInfo.bind(self, bounty)} onSave={self.getSave} />
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
                <div id="area-adventure-page" className="page-content"></div>
                );
        }
    }
});

module.exports = AreaAdventurePage;