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
                    <section className="row">
                        <AttrBlock type="stat" name="Type" glyph="type" attr={_.startCase(details.mechanism)} />
                        <AttrBlock type="stat" name="CR" glyph="challenge" attr={details.challenge} />
                        <AttrBlock type="stat" name="XP" glyph="xp" attr={details.rewardXp} />
                    </section>
                    <section className="row">
                        <AttrBlock type="custom" name="Trigger" className="text-alizarin bg-alizarin" attr={details.trigger} />
                    </section>
                    <section className="row">
                        <AttrBlock type="custom" name="Effects" className="text-pomegranate bg-pomegranate" attr={details.effects} />
                    </section>

                    <section className="row">
                        <div className="col-md-12">
                            <div className="text-peterriver">
                                <p className="body-header">Sense</p>
                                <section className="row">
                                    <AttrBlock type="stat" name="Skill" glyph="skill" attr={details.senseSkill} />
                                    <AttrBlock type="stat" name="DC" glyph="challenge" attr={details.senseSkillDifficulty} />
                                </section>
                                <section className="row">
                                    <TabbedArea defaultActiveKey={1}>
                                        <TabPane eventKey={1} tab="Pass">
                                            <AttrBlock type="details" attr={details.senseSkillPass} />
                                        </TabPane>
                                        <TabPane eventKey={2} tab="Fail">
                                            <AttrBlock type="details" attr={details.senseSkillFail} />
                                        </TabPane>
                                    </TabbedArea>
                                </section>
                            </div>
                        </div>
                    </section>

                    <section className="row">
                        <div className="col-md-12">
                            <div className="text-amethyst">
                                <p className="body-header">Overcome</p>
                                <section className="row">
                                    <AttrBlock type="stat" name="Skill" glyph="skill" attr={details.overcomeSkill} />
                                    <AttrBlock type="stat" name="DC" glyph="challenge" attr={details.overcomeSkillDifficulty} />
                                </section>
                                <section className="row">
                                    <TabbedArea defaultActiveKey={1}>
                                        <TabPane eventKey={1} tab="Pass">
                                            <AttrBlock type="details" attr={details.overcomeSkillPass} />
                                        </TabPane>
                                        <TabPane eventKey={2} tab="Fail">
                                            <AttrBlock type="details" attr={details.overcomeSkillFail} />
                                        </TabPane>
                                    </TabbedArea>
                                </section>
                            </div>
                        </div>
                    </section>
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