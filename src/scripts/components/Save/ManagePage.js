'use strict';

var React = require('react/addons');
var Router = require('react-router');

var Auth = require('../../helpers/Auth');

var CampaignModel = require('../../models/CampaignModel');
var SaveModel = require('../../models/SaveModel');

var Breadcrumb = require('../Common/Breadcrumb');
var PageHeader = require('../Model/PageHeader');
var FormModal = require('../Model/FormModal');
var Input = require('../Model/FormInput');
var Card = require('./Card');



var SaveManagePage = React.createClass({
    mixins: [Auth, Router.State],

    getInitialState: function() {
        return {
            campaign: null,
            saves: [],
            partyOptions: []
        }
    },

    componentWillMount: function() {
        var self = this;

        var campaignId = self.getParams().campaignId;

        new CampaignModel().get(campaignId)
            .done(function(campaign) {
                self.setState({campaign: campaign});
                self.getPartyOptions();
                self.getSaves();
            });
    },

    getSaves: function() {
        var self = this;
        var campaign = this.state.campaign;

        campaign.getSaves()
            .then(function(saves) {
                self.setState({saves: saves});
            });
    },

    getPartyOptions: function() {
        var self = this;

        Auth.User.getPartyOptions()
            .done(function(options) {
                self.setState({partyOptions: options});
            });
    },

    getInputs: function(attrs) {
        return (
            <div>
                <Input
                    type="select"
                    name="party_id"
                    placeholder="Party"
                    defaultValue={attrs.party_id}
                    options={this.state.partyOptions}
                />
                <div className="row">
                    <div className="col-md-6">
                        <Input
                            type="text"
                            name="xp"
                            placeholder="Current XP"
                            defaultValue={attrs.xp}
                            addonBefore="Current XP"
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            type="text"
                            name="days"
                            placeholder="Current Days"
                            defaultValue={attrs.days}
                            addonBefore="Current Days"
                        />
                    </div>
                </div>
                <Input
                    type="textarea"
                    name="notes"
                    placeholder="Notes"
                    defaultValue={attrs.notes}
                />
            </div>
            );
    },

    render: function () {
        var self = this;
        var campaign = self.state.campaign;

        if (_.isObject(campaign)) {
            var crumbs = [
                {
                    text: (<span>Campaign: <strong>{campaign.attrs.name}</strong></span>),
                    link: 'manage-campaigns'
                },
                {
                    text: (<span>Saves</span>)
                }
            ];

            return (
                <div id="save-manage-page" className="page-content">
                    <Breadcrumb crumbs={crumbs} />
                    <PageHeader pageName={campaign.attrs.name} pageType="Saves">
                        <FormModal model={SaveModel} parent={campaign} inputs={self.getInputs.bind(self, {})} onUpdate={self.getSaves} />
                    </PageHeader>
                    <div className="row">
                        {self.state.saves.map(function(save) {
                            return (
                                <div key={save.id} className="col-md-6">
                                    <Card model={SaveModel} campaign={campaign} save={save} inputs={self.getInputs.bind(self, save.attrs)} onUpdate={self.getSaves} />
                                </div>
                                );
                        })}
                    </div>
                </div>
                );
        }
        else {
            return (
                <div id="save-manage-page" className="page-content"></div>
                );
        }

    }
});

module.exports = SaveManagePage;