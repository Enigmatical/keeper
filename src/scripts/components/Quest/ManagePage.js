'use strict';

var React = require('react/addons');
var Router = require('react-router');

var Auth = require('../../helpers/Auth');

var CampaignModel = require('../../models/CampaignModel');
var ActModel = require('../../models/ActModel');

var Breadcrumb = require('../Common/Breadcrumb');
var PageHeader = require('../Model/PageHeader');
var FormModal = require('../Model/FormModal');
var Input = require('../Model/FormInput');

var QuestModel = require('../../models/QuestModel');
var Card = require('./Card');
var QuestInputs = require('./Inputs');



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

    getQuestInputs: function(attrs) {
        return(
            <QuestInputs attrs={attrs} />
            );
    },

    render: function () {
        var self = this;
        var campaign = this.state.campaign;
        var act = this.state.act;

        if (_.isObject(act)) {
            return (
                <div id="quest-manage-page" className="page-content">
                    <Breadcrumb crumbs={[
                        {
                            text: campaign.attrs.name + " (Acts)",
                            link: 'manage-acts',
                            params: {campaignId: campaign.id}
                        },
                        {
                            text: act.attrs.name
                        }
                    ]} />
                    <PageHeader pageName={act.attrs.name} pageType="Quests">
                        <FormModal model={QuestModel} related={{key: 'act_id', on: act}} inputs={self.getQuestInputs.bind(self, {})} onUpdate={self.getQuests} />
                    </PageHeader>
                    <div className="row">
                        {self.state.quests.map(function(quest){
                            return (
                                <div key={quest.id} className="col-md-6">
                                    <Card model={QuestModel} campaign={campaign} act={act} quest={quest} inputs={self.getQuestInputs.bind(self, quest.attrs)} onUpdate={self.getQuests} />
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


