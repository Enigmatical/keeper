'use strict';

var React = require('react/addons');
var Router = require('react-router');

var Auth = require('../../helpers/Auth');

var CampaignModel = require('../../models/CampaignModel');
var ActModel = require('../../models/ActModel');
var QuestModel = require('../../models/QuestModel');

var Breadcrumb = require('../Common/Breadcrumb');
var PageHeader = require('../Model/PageHeader');
var FormModal = require('../Model/FormModal');
var Input = require('../Model/FormInput');

var TaskModel = require('../../models/TaskModel');
var Card = require('./Card');



var TaskManagePage = React.createClass({
    mixins: [Auth, Router.State],

    getInitialState: function() {
        return {
            campaign: null,
            act: null,
            quest: null,
            tasks: []
        }
    },

    componentWillMount: function() {
        var self = this;

        var campaignId = self.getParams().campaignId;
        var actId = self.getParams().actId;
        var questId = self.getParams().questId;

        new CampaignModel().get(campaignId)
            .then(function(campaign) {
                self.setState({campaign: campaign});

                new ActModel().get(actId)
                    .then(function(act) {
                        self.setState({act: act});

                        new QuestModel().get(questId)
                            .then(function(quest) {
                                self.setState({quest: quest});
                                self.getTasks();
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

    getTaskInputs: function(attrs) {
        return (
            <div>
                <Input
                    type="text"
                    name="name"
                    placeholder="Objective"
                    defaultValue={attrs.name}
                />
                <Input
                    type="textarea"
                    name="details"
                    defaultValue={attrs.details}
                />
                <Input
                    type="textarea"
                    name="flavor"
                    defaultValue={attrs.flavor}
                />
            </div>
            );
    },

    render: function () {
        var self = this;
        var campaign = self.state.campaign;
        var act = self.state.act;
        var quest = self.state.quest;

        if (_.isObject(quest)) {
            var crumbs = [
                {
                    text: (<span>Campaign: <strong>{campaign.attrs.name}</strong></span>),
                    link: 'manage-campaigns'
                },
                {
                    text: (<span>Act: <strong>{act.attrs.name}</strong></span>),
                    link: 'manage-acts',
                    params: {campaignId: campaign.id}
                },
                {
                    text: (<span>Quest: <strong>{quest.attrs.name}</strong></span>),
                    link: 'manage-quests',
                    params: {campaignId: campaign.id, actId: act.id}
                },
                {
                    text: (<span>Tasks</span>)
                }
            ];

            return (
                <div id="task-manage-page" className="page-content">
                    <Breadcrumb crumbs={crumbs} />
                    <PageHeader pageName={quest.attrs.name} pageType="Tasks">
                        <FormModal model={TaskModel} related={{key: 'quest_id', on: quest}} inputs={self.getTaskInputs.bind(self, {})} onUpdate={self.getTasks} />
                    </PageHeader>
                    <div className="row">
                        {self.state.tasks.map(function(task){
                            return (
                                <div key={task.id} className="col-md-6">
                                    <Card model={TaskModel} campaign={campaign} act={act} quest={quest} task={task} inputs={self.getTaskInputs.bind(self, task.attrs)} onUpdate={self.getTasks} />
                                </div>
                                );
                        })}
                    </div>
                </div>
                );
        }
        else {
            return (
                <div id="task-manage-page" className="page-content"></div>
                );
        }
    }
});

module.exports = TaskManagePage;