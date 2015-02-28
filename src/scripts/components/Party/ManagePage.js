'use strict';

var React = require('react/addons');

var Auth = require('../../helpers/Auth');

var Breadcrumb = require('../Common/Breadcrumb');
var PageHeader = require('../Model/PageHeader');
var FormModal = require('../Model/FormModal');
var Input = require('../Model/FormInput');

var Model = require('../../models/PartyModel');
var Card = require('./Card');



var PartyManagePage = React.createClass({
    mixins: [Auth],

    getInitialState: function() {
        return {
            parties: []
        }
    },

    componentWillMount: function() {
        this.getParties();
    },

    getParties: function() {
        var self = this;

        Auth.User.getParties().then(function(parties) {
            self.setState({parties: parties});
        });
    },

    getPartyInputs: function(attrs) {
        return (
            <div>
                <Input
                    type="text"
                    name="name"
                    defaultValue={attrs.name}
                />

                <Input
                    type="text"
                    name="count"
                    placeholder="Party Size"
                    defaultValue={attrs.count}
                    addonBefore="Size"
                />

                <Input
                    type="textarea"
                    name="details"
                    defaultValue={attrs.details}
                />
            </div>
            );
    },

    render: function () {
        var self = this;

        return (
            <div id="parties-manage-page" className="page-content">
                <PageHeader pageName="Parties">
                    <FormModal model={Model} parent={Auth.User} inputs={self.getPartyInputs.bind(self, {})} onUpdate={self.getParties} />
                </PageHeader>
                <div className="row">
                    {self.state.parties.map(function(party) {
                        return (
                            <div key={party.id} className="col-md-6">
                                <Card model={Model} party={party} inputs={self.getPartyInputs.bind(self, party.attrs)} onUpdate={self.getParties} />
                            </div>
                            );
                    })}
                </div>
            </div>
            );
    }
});

module.exports = PartyManagePage;


