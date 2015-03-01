'use strict';

var React = require('react/addons');
var Router = require('react-router');

var Auth = require('../../../helpers/Auth');

var CampaignModel = require('../../../models/CampaignModel');
var SaveModel = require('../../../models/SaveModel');

var ActModel = require('../../../models/ActModel');
var QuestModel = require('../../../models/QuestModel');
var TaskModel = require('../../../models/TaskModel');

var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var PageHeader = require('../PageHeader');
var Breadcrumb = require('../../Common/Breadcrumb');

var Card = require('../Card');
var TaskInfo = require('./Info');


var TaskAdventurePage = React.createClass({
    mixins: [Auth, Router.State],

    getInitialState: function() {
        return {
            campaign: null,
            act: null,
            quest: null,
            save: null,
            tasks: []
        }
    },

    componentWillMount: function() {
        var self = this;

        var campaignId = self.getParams().campaignId;
        var actId = self.getParams().actId;
        var questId = self.getParams().questId;
        var saveId = self.getParams().saveId;

        new CampaignModel().get(campaignId)
            .done(function(campaign) {
                new ActModel().get(actId)
                    .done(function(act) {
                        new QuestModel().get(questId)
                            .done(function(quest) {
                                new SaveModel().get(saveId)
                                    .done(function(save) {
                                        save.getJoins()
                                            .done(function() {
                                                self.setState({
                                                    campaign: campaign,
                                                    act: act,
                                                    quest: quest,
                                                    save: save
                                                });
                                                self.getTasks();
                                            });
                                    });
                            });

                    });
            });


    },

    getTasks: function() {
        var self = this;
        var quest = this.state.quest;

        quest.getTasks()
            .then(function(tasks) {
                self.setState({tasks: tasks});
            });
    },

    getInfo: function(target) {
        return(<TaskInfo target={target} />);
    },

    render: function () {
        var self = this;
        var campaign = self.state.campaign;
        var act = self.state.act;
        var quest = self.state.quest;
        var save = self.state.save;

        if (_.isObject(quest)) {
            var crumbs = [
                {
                    text: (<span>Act: <strong>{act.attrs.name}</strong></span>),
                    link: "adventure-acts",
                    params: {campaignId: campaign.id, saveId: save.id}
                },
                {
                    text: (<span>Quest: <strong>{quest.attrs.name}</strong></span>),
                    link: "adventure-quests",
                    params: {campaignId: campaign.id, saveId: save.id, actId: act.id}
                },
                {
                    text: "Tasks"
                }
            ];

            return (
                <div id="task-adventure-page" className="page-content">
                    <PageHeader campaign={campaign} save={save} section="campaign" />
                    <Breadcrumb className="breadcrumb-adventure" crumbs={crumbs} />
                    <div className="row">
                        {self.state.tasks.map(function(task) {
                            var leftButtons = [
                            ];
                            return (
                                <div key={task.id} className="col-md-12">
                                    <Card target={task} save={save} canComplete={true} leftButtons={leftButtons} getInfo={self.getInfo.bind(self, task)} />
                                </div>
                                );
                        })}
                    </div>
                </div>
                );
        }
        else {
            return (
                <div id="task-adventure-page" className="page-content"></div>
                );
        }
    }
});

module.exports = TaskAdventurePage;