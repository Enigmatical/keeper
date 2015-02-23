'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Q = require('q');

var Pathfinder = require('../../../helpers/Pathfinder');

var Input = require('../../Model/FormInput');



var EncounterMechanismInputs = React.createClass({
    getInitialState: function() {
        return {
            senseSkill: null,
            overcomeSkill: null
        }
    },

    handleSenseSkill: function(event) {
        var self = this;
        var skill = event.target.options[event.target.selectedIndex].innerHTML;

        self.setState({senseSkill: skill});
    },

    handleOvercomeSkill: function(event) {
        var self = this;
        var skill = event.target.options[event.target.selectedIndex].innerHTML;

        self.setState({overcomeSkill: skill});
    },

    handleRewards: function(event) {
        var challenge = event.target.value;
        var rewardXp = Pathfinder.getXp(challenge);

        this.refs.rewardXp.getDOMNode().querySelector('[name=rewardXp]').setAttribute('value', rewardXp);
    },

    render: function() {
        var attrs = this.props.attrs;
        var details = _.isObject(attrs.details) ? attrs.details : {};

        return (
            <div className="details">
                <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    defaultValue={details.name}
                />
                <div className="row">
                    <div className="col-md-4">
                        <Input
                            type="select"
                            name="mechanism"
                            placeholder="Type"
                            options={Pathfinder.getMechanismTypeOptions()}
                            defaultValue={details.mechanism}
                        />
                    </div>
                    <div className="col-md-4">
                        <Input
                            type="select"
                            name="challenge"
                            placeholder="Challenge Rating"
                            options={Pathfinder.getChallengeRatingOptions()}
                            defaultValue={details.challenge}
                            onChange={this.handleRewards}
                        />
                    </div>
                    <div className="col-md-4">
                        <Input
                            type="text"
                            name="rewardXp"
                            ref="rewardXp"
                            placeholder="Reward XP"
                            value={details.rewardXp}
                            readOnly
                            addonAfter="XP"
                        />
                    </div>
                </div>

                <h5 className="page-header">Details</h5>
                <Input
                    type="textarea"
                    name="trigger"
                    placeholder="Trigger & Reset"
                    defaultValue={details.trigger}
                />
                <Input
                    type="textarea"
                    name="effects"
                    placeholder="Effects"
                    defaultValue={details.effects}
                />

                <h5 className="page-header">Sense</h5>
                <div className="row">
                    <div className="col-md-6">
                        <Input
                            type="select"
                            name="senseSkill_id"
                            placeholder="Sense Skill"
                            options={Pathfinder.getSkillOptions()}
                            defaultValue={details.senseSkill_id}
                            onChange={this.handleSenseSkill}
                        />
                        <Input
                            type="hidden"
                            name="senseSkill"
                            value={this.state.senseSkill}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            type="text"
                            name="senseSkillDifficulty"
                            addonBefore="DC"
                            defaultValue={details.senseSkillDifficulty}
                        />
                    </div>
                </div>
                <Input
                    type="textarea"
                    name="senseSkillPass"
                    placeholder="Sense Check Passed"
                    defaultValue={details.senseSkillPass}
                />
                <Input
                    type="textarea"
                    name="senseSkillFail"
                    placeholder="Sense Check Failed"
                    defaultValue={details.senseSkillFail}
                />

                <h5 className="page-header">Overcome</h5>
                <div className="row">
                    <div className="col-md-6">
                        <Input
                            type="select"
                            name="overcomeSkill_id"
                            placeholder="Overcome Skill"
                            options={Pathfinder.getSkillOptions()}
                            defaultValue={details.overcomeSkill_id}
                            onChange={this.handleOvercomeSkill}
                        />
                        <Input
                            type="hidden"
                            name="overcomeSkill"
                            value={this.state.overcomeSkill}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            type="text"
                            name="overcomeSkillDifficulty"
                            addonBefore="DC"
                            defaultValue={details.overcomeSkillDifficulty}
                        />
                    </div>
                </div>
                <Input
                    type="textarea"
                    name="overcomeSkillPass"
                    placeholder="Overcome Check Passed"
                    defaultValue={details.overcomeSkillPass}
                />
                <Input
                    type="textarea"
                    name="overcomeSkillFail"
                    placeholder="Overcome Check Failed"
                    defaultValue={details.overcomeSkillFail}
                />
            </div>
            );
    }
});


module.exports = EncounterMechanismInputs;