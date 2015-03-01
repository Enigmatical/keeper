'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Pathfinder = require('../../../helpers/Pathfinder');

var BattleModel = require('../../../models/BattleModel');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;
var TabbedArea = require('react-bootstrap').TabbedArea;
var TabPane = require('react-bootstrap').TabPane;

var AttrBlock = require('../../Model/AttrBlock');

var AdjustXp = require('../AdjustXpButton');
var AdjustTime = require('../AdjustTimeButton');



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

    getBattleTime: function() {
        var save = this.props.save;
        var battle = this.state.battle;

        return Pathfinder.getBattleTime(save.attrs.xp, save.party.attrs.count, battle.attrs.challenge);
    },

    render: function () {
        var self = this;
        var save = self.props.save;
        var data = self.props.data;
        var details = data.details;

        var battle = self.state.battle;
        var battlers = self.state.battlers;

        if (_.isObject(battle)) {
            var time = self.getBattleTime();
            var timeButton = (<span />);
            if (time > 0) {
                timeButton = (<AdjustTime save={save} segs={time} onSave={self.props.onSave} />);
            }

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
                            <AdjustXp save={save} xp={battle.attrs.rewardXp} onSave={self.props.onSave} />
                            {timeButton}
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