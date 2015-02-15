'use strict';

var React = require('react/addons');
var Router = require('react-router');

var Auth = require('../helpers/Auth');

var CampaignModel = require('../models/CampaignModel');
var ActModel = require('../models/ActModel');

var CampaignBreadcrumb = require('./CampaignBreadcrumb');
var QuestFormModal = require('./QuestFormModal');
var QuestCard = require('./QuestCard');



var QuestManagePage = React.createClass({
    mixins: [Auth, Router.State],

    getInitialState: function() {
        return {
            campaign: null,
            act: null,
            quests: []
        }
    },

    componentWillMount: function() {
        var self = this;

        var campaignId = self.getParams().campaignId;
        var actId = self.getParams().actId;

        new CampaignModel().get(campaignId)
            .then(function(campaign) {
                self.setState({campaign: campaign});

                new ActModel().get(actId)
                    .then(function(act) {
                        self.setState({act: act});
                        self.getQuests();
                    });
            });
    },

    getQuests: function() {
        var self = this;
        var act = this.state.act;

        act.getQuests()
            .then(function(quests) {
                self.setState({quests: quests});
            });
    },

    render: function () {
        var self = this;

        if (_.isObject(self.state.act)) {
            return (
                <div id="quest-manage-page" className="page-content">
                    <CampaignBreadcrumb campaign={this.state.campaign} act={this.state.act} />
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="page-header">
                                {self.state.act.attrs.title}&nbsp;&nbsp;<small>{self.state.act.attrs.category}</small>
                                <QuestFormModal className="pull-right" act={self.state.act} onUpdate={self.getQuests} />
                            </h1>
                        </div>
                    </div>
                    <div className="row">
                        {self.state.quests.map(function(quest){
                            return (
                                <div key={quest.id} className="col-md-6">
                                    <QuestCard campaign={self.state.campaign} act={self.state.act} quest={quest} onUpdate={self.getQuests} />
                                </div>
                                );
                        })}
                    </div>
                </div>
                );
        }
        else {
            return (
                <div id="quest-manage-page" className="page-content"></div>
                );
        }
    }
});

module.exports = QuestManagePage;


