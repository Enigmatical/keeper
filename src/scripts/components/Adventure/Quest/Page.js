'use strict';

var React = require('react/addons');
var Router = require('react-router');

var Auth = require('../../../helpers/Auth');

var CampaignModel = require('../../../models/CampaignModel');
var SaveModel = require('../../../models/SaveModel');

var ActModel = require('../../../models/ActModel');
var QuestModel = require('../../../models/QuestModel');

var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var PageHeader = require('../PageHeader');
var Breadcrumb = require('../../Common/Breadcrumb');

var Card = require('../Card');
var QuestInfo = require('./Info');


var QuestAdventurePage = React.createClass({
    mixins: [Auth, Router.State],

    getInitialState: function() {
        return {
            campaign: null,
            act: null,
            save: null,
            quests: []
        }
    },

    componentWillMount: function() {
        var self = this;

        var campaignId = self.getParams().campaignId;
        var actId = self.getParams().actId;
        var saveId = self.getParams().saveId;

        new CampaignModel().get(campaignId)
            .done(function(campaign) {
                new ActModel().get(actId)
                    .done(function(act) {
                        new SaveModel().get(saveId)
                            .done(function(save) {
                                save.getJoins()
                                    .done(function() {
                                        self.setState({
                                            campaign: campaign,
                                            act: act,
                                            save: save
                                        });
                                        self.getQuests();
                                    });
                            });
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

    getInfo: function(target) {
       return (<QuestInfo target={target} />);
    },

    render: function () {
        var self = this;
        var campaign = self.state.campaign;
        var act = self.state.act;
        var save = self.state.save;

        if (_.isObject(act)) {
            var crumbs = [
                {
                    text: (<span>Act: <strong>{act.attrs.name}</strong></span>),
                    link: "adventure-acts",
                    params: {campaignId: campaign.id, saveId: save.id}
                },
                {
                    text: "Quests"
                }
            ];

            return (
                <div id="quest-adventure-page" className="page-content">
                    <PageHeader campaign={campaign} save={save} section="campaign" />
                    <Breadcrumb className="breadcrumb-adventure" crumbs={crumbs} />
                    <div className="row">
                        {self.state.quests.map(function(quest) {
                            var leftButtons = [
                                (<ButtonLink bsStyle="primary" to="adventure-tasks" params={{campaignId: campaign.id, saveId: save.id, actId: act.id, questId: quest.id}}><Glyphicon glyph="play" /> Tasks</ButtonLink>)
                            ];
                            return (
                                <div key={quest.id} className="col-md-12">
                                    <Card target={quest} save={save} canComplete={true} type={<span>CR <strong>{quest.attrs.challenge}</strong></span>} leftButtons={leftButtons} getInfo={self.getInfo.bind(self, quest)} />
                                </div>
                                );
                        })}
                    </div>
                </div>
                );
        }
        else {
            return (
                <div id="quest-adventure-page" className="page-content"></div>
                );
        }
    }
});

module.exports = QuestAdventurePage;