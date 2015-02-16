'use strict';

var React = require('react/addons');
var Router = require('react-router');

var Auth = require('../helpers/Auth');

var CampaignModel = require('../models/CampaignModel');
var ActModel = require('../models/ActModel');
var QuestModel = require('../models/QuestModel');

var Breadcrumb = require('./MainBreadcrumb');
var PageHeader = require('./ModelPageHeader');
var FormModal = require('./TaskFormModal');
var Card = require('./TaskCard');



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

    render: function () {
        var self = this;
        var campaign = self.state.campaign;
        var act = self.state.act;
        var quest = self.state.quest;

        if (_.isObject(quest)) {
            return (
                <div id="task-manage-page" className="page-content">
                    <Breadcrumb crumbs={[
                        {
                            text: campaign.attrs.name,
                            link: 'manage-acts',
                            params: {campaignId: campaign.id}
                        },
                        {
                            text: act.attrs.name,
                            link: 'manage-quests',
                            params: {campaignId: campaign.id, actId: act.id}
                        },
                        {
                            text: quest.attrs.name
                        }
                    ]} />
                    <PageHeader pageName={quest.attrs.name} pageType="Tasks">
                        <FormModal quest={quest} onUpdate={self.getTasks} />
                    </PageHeader>
                    <div className="row">
                        {self.state.tasks.map(function(task){
                            return (
                                <div key={task.id} className="col-md-6">
                                    <Card campaign={campaign} act={act} quest={quest} task={task} onUpdate={self.getTasks} />
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