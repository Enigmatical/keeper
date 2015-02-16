'use strict';

var React = require('react/addons');
var Router = require('react-router');

var Auth = require('../helpers/Auth');

var CampaignModel = require('../models/CampaignModel');
var ActModel = require('../models/ActModel');
var QuestModel = require('../models/QuestModel');

var CampaignBreadcrumb = require('./CampaignBreadcrumb');
var TaskFormModal = require('./TaskFormModal');
var TaskCard = require('./TaskCard');



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

        if (_.isObject(self.state.quest)) {
            return (
                <div id="task-manage-page" className="page-content">
                    <CampaignBreadcrumb campaign={this.state.campaign} act={this.state.act} quest={this.state.quest} />
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="page-header">
                                {self.state.quest.attrs.title}
                                <TaskFormModal className="pull-right" quest={self.state.quest} onUpdate={self.getTasks} />
                            </h1>
                        </div>
                    </div>
                    <div className="row">
                        {self.state.tasks.map(function(task){
                            return (
                                <div key={task.id} className="col-md-6">
                                    <TaskCard campaign={self.state.campaign} act={self.state.act} quest={self.state.quest} task={task} onUpdate={self.getTasks} />
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





