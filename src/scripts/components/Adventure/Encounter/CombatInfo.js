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
                        <section className="row">
                            <div className="col-md-12">
                                {battlers.map(function(battler) {
                                    return (
                                        <div key={battler.id} className="text-pomegranate bg-pomegranate">
                                            <p className="body-header">{battler.foe.attrs.name} <small>x<strong>{battler.attrs.count}</strong></small></p>
                                            <section className="row">
                                                <AttrBlock type="custom" className="text-wetasphalt" attr={battler.foe.attrs.quick} />
                                            </section>
                                        </div>
                                        );
                                })}
                            </div>
                        </section>
                        <section className="row">
                            <div className="col-md-12">
                                <p className="body-header">Bestiary</p>
                                <TabbedArea defaultActiveKey={1}>
                                    {battlers.map(function(battler, index) {
                                        return (
                                            <TabPane key={'foe' + index} eventKey={index + 1} tab={battler.foe.attrs.name}>
                                                <AttrBlock type="flavor" attr={battler.foe.attrs.flavor} />
                                                <AttrBlock type="details" attr={battler.foe.attrs.details} />
                                                <section className="row">
                                                    <AttrBlock type="stat" name="Page" glyph="page" attr={battler.foe.attrs.page} />
                                                </section>
                                            </TabPane>
                                            );
                                    })}
                                </TabbedArea>
                            </div>
                        </section>
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