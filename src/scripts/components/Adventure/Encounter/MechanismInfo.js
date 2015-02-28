'use strict';

var React = require('react/addons');
var _ = require('lodash');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;
var TabbedArea = require('react-bootstrap').TabbedArea;
var TabPane = require('react-bootstrap').TabPane;

var AttrBlock = require('../../Model/AttrBlock');
var Stats = require('../Stats');



var EncounterMechanismAdventureInfo = React.createClass({

    render: function () {
        var self = this;
        var data = this.props.data;
        var details = this.props.data.details;

        var stats = [
            {
                glyph: 'info-sign',
                label: 'Type',
                value: _.startCase(details.mechanism)
            },
            {
                glyph: 'exclamation-sign',
                label: 'CR',
                value: details.challenge
            },
            {
                glyph: 'star',
                label: 'XP',
                value: '+' + details.rewardXp
            }
        ];

        var senseStats = [
            {
                glyph: 'eye-open',
                label: 'Skill',
                value: details.senseSkill
            },
            {
                glyph: 'exclamation-sign',
                label: 'DC',
                value: details.senseSkillDifficulty
            }
        ];

        var overcomeStats = [
            {
                glyph: 'eye-open',
                label: 'Skill',
                value: details.overcomeSkill
            },
            {
                glyph: 'exclamation-sign',
                label: 'DC',
                value: details.overcomeSkillDifficulty
            }
        ];

        return (
            <div>
                <div className="card-body">
                    <div className="text-alizarin">
                        <p className="body-header">Trigger</p>
                        <Stats stats={stats} />
                        <AttrBlock attr={details.trigger} markdown />
                    </div>

                    <div className="text-pomegranate">
                        <p className="body-header">Effects</p>
                        <AttrBlock attr={details.effects} markdown />
                    </div>

                    <div className="text-peterriver">
                        <p className="body-header">Sense</p>
                        <Stats stats={senseStats} />
                        <div className="col-md-12">
                            <TabbedArea defaultActiveKey={1}>
                                <TabPane eventKey={1} tab="Pass">
                                    <AttrBlock attr={details.senseSkillPass} markdown />
                                </TabPane>
                                <TabPane eventKey={2} tab="Fail">
                                    <AttrBlock attr={details.senseSkillFail} markdown />
                                </TabPane>
                            </TabbedArea>
                        </div>
                    </div>

                    <div className="text-amethyst">
                        <p className="body-header">Overcome</p>
                        <Stats stats={overcomeStats} />
                        <div className="col-md-12">
                            <TabbedArea defaultActiveKey={1}>
                                <TabPane eventKey={1} tab="Pass">
                                    <AttrBlock attr={details.overcomeSkillPass} markdown />
                                </TabPane>
                                <TabPane eventKey={2} tab="Fail">
                                    <AttrBlock attr={details.overcomeSkillFail} markdown />
                                </TabPane>
                            </TabbedArea>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <Button bsStyle="success" bsSize="small"><Glyphicon glyph="star" /> Reward +{details.rewardXp} XP</Button>
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = EncounterMechanismAdventureInfo;