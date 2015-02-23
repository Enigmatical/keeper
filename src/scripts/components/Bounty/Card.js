'use strict';

var React = require('react/addons');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var FormModal = require('../Model/FormModal');
var RemoveModal = require('../Model/RemoveModal');
var AttrBlock = require('../Model/AttrBlock');

var EncounterFormModal = require('../Encounter/FormModal');
var EncounterCard = require('../Encounter/Card');

require('../../../styles/ItemCard.css');



var BountyCard = React.createClass({
    getInitialState: function() {
        return {
            encounters: []
        }
    },

    componentWillMount: function() {
        this.getEncounters();
    },

    getEncounters: function() {
        var self = this;
        var bounty = self.props.bounty;

        bounty.getEncounters()
            .done(function(encounters) {
                self.setState({encounters: encounters});
            });
    },

    render: function () {
        var self = this;
        var campaign = self.props.campaign;
        var location = self.props.location;
        var bounty = self.props.bounty;

        var encounters = function() {
            var encounters = self.state.encounters;

            if (encounters.length > 0) {
                return (
                    <div className="card-links">
                        <p className="body-header">Encounters</p>
                        {self.state.encounters.map(function(encounter) {
                            return (
                                <EncounterCard key={encounter.id} target={encounter} parent={bounty} campaign={campaign} onUpdate={self.getEncounters} />
                                );
                        })}
                    </div>
                    );
            }
        };

        return (
            <div className="item-card bounty-card">
                <div className="card-header">
                    <p className="pull-left">
                        {bounty.attrs.name}
                    </p>
                    <p className="pull-right">
                        <small className="text-muted">{bounty.attrs.type}&nbsp;&nbsp;<strong>CR {bounty.attrs.challenge}</strong></small>
                    </p>
                </div>
                <div className="card-body">
                    <AttrBlock name="Flavor" attr={bounty.attrs.flavor} markdown />
                    <AttrBlock name="Rewards" attr={bounty.attrs.rewardOther} markdown />
                    {encounters()}
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <EncounterFormModal link={true} parent={bounty} campaign={campaign} onUpdate={self.getEncounters} />
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal target={bounty} model={this.props.model} parent={location} inputs={this.props.inputs} onUpdate={self.props.onUpdate} />
                        <RemoveModal target={bounty} onUpdate={self.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = BountyCard;





