'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Pathfinder = require('../../../helpers/Pathfinder');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;
var TabbedArea = require('react-bootstrap').TabbedArea;
var TabPane = require('react-bootstrap').TabPane;

var AttrBlock = require('../../Model/AttrBlock');

var AdjustXp = require('../AdjustXpButton');
var AdjustTime = require('../AdjustTimeButton');



var EncounterMechanismAdventureInfo = React.createClass({
    getMechanismTime: function() {
        var save = this.props.save;
        var challenge = this.props.data.details.challenge;

        return parseInt(Pathfinder.getBattleTime(save.attrs.xp, save.party.attrs.count, challenge)/2);
    },

    render: function () {
        var self = this;
        var save = self.props.save;
        var data = self.props.data;
        var details = data.details;

        var time = self.getMechanismTime();
        var timeButton = (<span />);
        if (time > 0) {
            timeButton = (<AdjustTime save={save} segs={time} onSave={self.props.onSave} />);
        }

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
                        <AdjustXp save={save} xp={details.rewardXp} onSave={self.props.onSave} />
                        {timeButton}
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = EncounterMechanismAdventureInfo;