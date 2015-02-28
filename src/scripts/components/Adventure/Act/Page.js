'use strict';

var React = require('react/addons');
var Router = require('react-router');

var Auth = require('../../../helpers/Auth');

var CampaignModel = require('../../../models/CampaignModel');
var SaveModel = require('../../../models/SaveModel');

var ActModel = require('../../../models/ActModel');

var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var PageHeader = require('../PageHeader');
var Breadcrumb = require('../../Common/Breadcrumb');

var Card = require('../Card');

var ActInfo = require('./Info');


var ActAdventurePage = React.createClass({
    mixins: [Auth, Router.State],

    getInitialState: function() {
        return {
            campaign: null,
            save: null,
            acts: []
        }
    },

    componentWillMount: function() {
        var self = this;

        var campaignId = self.getParams().campaignId;
        var saveId = self.getParams().saveId;

        new CampaignModel().get(campaignId)
            .done(function(campaign) {
                new SaveModel().get(saveId)
                    .done(function(save) {
                        save.getJoins()
                            .done(function() {
                                self.setState({
                                    campaign: campaign,
                                    save: save
                                });
                                self.getActs();
                            });
                    });
            });


    },

    getActs: function() {
        var self = this;
        var campaign = this.state.campaign;

        campaign.getActs()
            .then(function(acts) {
                self.setState({acts: acts});
            });
    },

    getInfo: function(target) {
        return (<ActInfo target={target} />);
    },

    render: function () {
        var self = this;
        var campaign = self.state.campaign;
        var save = self.state.save;

        if (_.isObject(campaign)) {
            var crumbs = [
                {
                    text: 'Acts'
                }
            ];

            return (
                <div id="act-adventure-page" className="page-content">
                    <PageHeader campaign={campaign} save={save} />
                    <Breadcrumb className="breadcrumb-adventure" crumbs={crumbs} />
                    <div className="row">
                        {self.state.acts.map(function(act) {
                            var leftButtons = [
                                (<ButtonLink key={act.id + '_link'} bsStyle="primary" to="adventure-quests" params={{campaignId: campaign.id, saveId: save.id, actId: act.id}}><Glyphicon glyph="play" /> Quests</ButtonLink>),
                            ];
                            return (
                                <div key={act.id} className="col-md-12">
                                    <Card model={ActModel} target={act} leftButtons={leftButtons} getInfo={self.getInfo.bind(self, act)} />
                                </div>
                                );
                        })}
                    </div>
                </div>
                );
        }
        else {
            return (
                <div id="act-adventure-page" className="page-content"></div>
                );
        }
    }
});

module.exports = ActAdventurePage;