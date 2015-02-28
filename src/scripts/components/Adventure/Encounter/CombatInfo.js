'use strict';

var React = require('react/addons');
var _ = require('lodash');

var BattleModel = require('../../../models/BattleModel');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;
var TabbedArea = require('react-bootstrap').TabbedArea;
var TabPane = require('react-bootstrap').TabPane;

var AttrBlock = require('../../Model/AttrBlock');
var Stats = require('../Stats');



var EncounterCombatAdventureInfo = React.createClass({
    getInitialState: function() {
        return {
            battle: null,
            battlers: null
        }
    },

    componentWillMount: function() {
        this.getBattle();
    },

    getBattle: function() {
        var self = this;
        var battle_id = this.props.data.details.battle_id;

        new BattleModel().get(battle_id)
            .done(function(battle) {
                battle.getBattlers()
                    .done(function(battlers) {
                        self.setState(
                            {
                                battle: battle,
                                battlers: battlers
                            }
                        );
                    });
            });
    },

    render: function () {
        var self = this;
        var data = this.props.data;
        var details = this.props.data.details;

        var battle = this.state.battle;
        var battlers = this.state.battlers;

        if (_.isObject(battle)) {
            var stats = [
                {
                    glyph: 'exclamation-sign',
                    label: 'CR',
                    value: battle.attrs.challenge
                },
                {
                    glyph: 'star',
                    label: 'XP',
                    value: '+' + battle.attrs.rewardXp
                },
                {
                    glyph: 'tasks',
                    label: 'Coin',
                    value: '+' + battle.attrs.rewardCoin + ' gp'
                }
            ];

            return (
                <div>
                    <div className="card-body">
                        <div className="text-alizarin">
                            <p className="body-header">Stats</p>
                            <Stats stats={stats} />
                        </div>
                        <div className="text-pomegranate">
                            {battlers.map(function(battler) {
                                return (
                                    <div key={battler.id}>
                                        <p className="body-header">{battler.foe.attrs.name}<small>x{battler.attrs.count}</small></p>
                                        <AttrBlock text="muted" attr={battler.foe.attrs.quick} markdown />
                                    </div>
                                    );
                            })}
                        </div>
                        <div className="text-peterriver">
                            <p className="body-header">Bestiary</p>
                            <div className="col-md-12">
                                <TabbedArea defaultActiveKey={1}>
                                    {battlers.map(function(battler, index) {
                                        return (
                                            <TabPane key={'foe' + index} eventKey={index + 1} tab={battler.foe.attrs.name}>
                                                <AttrBlock text="turquoise" attr={battler.foe.attrs.flavor} markdown />
                                                <AttrBlock attr={battler.foe.attrs.details} markdown />
                                                <AttrBlock attr={battler.foe.attrs.page} />
                                            </TabPane>
                                            );
                                    })}
                                </TabbedArea>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <ButtonToolbar className="pull-left">
                            <Button bsStyle="success" bsSize="small"><Glyphicon glyph="star" /> Reward +{battle.attrs.rewardXp} XP</Button>
                        </ButtonToolbar>
                    </div>
                </div>
                );
        }
        else {
            return (<span />);
        }
    }
});

module.exports = EncounterCombatAdventureInfo;