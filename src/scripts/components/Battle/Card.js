'use strict';

var React = require('react/addons');

var Auth = require('../../helpers/Auth');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var FormModal = require('../Model/FormModal');
var RemoveModal = require('../Model/RemoveModal');
var AttrBlock = require('../Model/AttrBlock');
var Input = require('../Model/FormInput');

var BattlerModel = require('../../models/BattlerModel');
var Card = require('../Battler/Card');

require('../../../styles/ItemCard.css');



var BattleCard = React.createClass({
    getInitialState: function() {
        return {
            battlers: [],
            foeOptions: []
        }
    },

    componentWillMount: function() {
        this.getBattlers(false);
        this.getFoeOptions();
    },

    getBattlers: function(callOnUpdate) {
        if (callOnUpdate === undefined) {
            callOnUpdate = true;
        }

        var self = this;
        var battle = self.props.battle;

        battle.getBattlers()
            .done(function(battlers) {
                self.setState({battlers: battlers});

                if (callOnUpdate) {
                    battle.updateAttributes()
                        .done(function() {
                            if (_.isFunction(self.props.onUpdate)) {
                                self.props.onUpdate();
                            }
                        });
                }
            });
    },

    getFoeOptions: function() {
        var self = this;

        Auth.User.getFoeOptions()
            .done(function(options) {
                self.setState({foeOptions: options});
            });
    },

    getBattlerInputs: function(attrs) {
        return (
            <div>
                <Input
                    type="select"
                    name="foe_id"
                    placeholder="Foe"
                    defaultValue={attrs.foe_id}
                    options={this.state.foeOptions}
                />
                <div className="row">
                    <div className="col-md-6">
                        <Input
                            type="text"
                            name="count"
                            placeholder="How Many?"
                            defaultValue={attrs.count}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            type="text"
                            name="type"
                            placeholder="Status"
                            defaultValue={attrs.type}
                        />
                    </div>
                </div>
            </div>
            );
    },

    render: function () {
        var self = this;
        var battle = self.props.battle;

        var challengeRating = battle.attrs.challenge ? ('  CR ' + battle.attrs.challenge) : '';

        return (
            <div className="item-card battle-card">
                <div className="card-header">
                    <p className="pull-left">
                        {battle.attrs.name}
                    </p>
                    <p className="pull-right">
                        <small className="text-muted">{battle.attrs.type}<strong>{challengeRating}</strong></small>
                    </p>
                </div>
                <div className="card-body">
                    <AttrBlock name="Flavor" attr={battle.attrs.flavor} markdown />
                    <AttrBlock name="Details" attr={battle.attrs.details} markdown />
                    <div className="card-links">
                        {self.state.battlers.map(function(battler) {
                            return (
                                <Card key={battler.id} target={battler} parent={battle} model={BattlerModel} inputs={self.getBattlerInputs.bind(self, battler.attrs)} onUpdate={self.getBattlers} />
                                );
                        })}
                    </div>
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <FormModal link={true} model={BattlerModel} parent={battle} inputs={self.getBattlerInputs.bind(self, {})} onUpdate={self.getBattlers} />
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal target={battle} model={this.props.model} parent={Auth.User} inputs={this.props.inputs} onUpdate={self.props.onUpdate} />
                        <RemoveModal target={battle} onUpdate={self.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = BattleCard;


