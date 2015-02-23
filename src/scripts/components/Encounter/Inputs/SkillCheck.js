'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Q = require('q');

var Pathfinder = require('../../../helpers/Pathfinder');

var Input = require('../../Model/FormInput');



var EncounterSkillCheckInputs = React.createClass({
    getInitialState: function() {
        return {
            skill: null
        }
    },

    handleSkill: function(event) {
        var self = this;
        var skill = event.target.options[event.target.selectedIndex].innerHTML;

        self.setState({skill: skill});
    },

    render: function() {
        var attrs = this.props.attrs;
        var details = _.isObject(attrs.details) ? attrs.details : {};

        return (
            <div className="details">
                <div className="row">
                    <div className="col-md-6">
                        <Input
                            type="select"
                            name="skill_id"
                            placeholder="Skill"
                            options={Pathfinder.getSkillOptions()}
                            defaultValue={details.skill_id}
                            onChange={this.handleSkill}
                        />
                        <Input
                            type="hidden"
                            name="skill"
                            value={this.state.skill}
                        />
                    </div>
                    <div className="col-md-6">
                        <Input
                            type="text"
                            name="skillDifficulty"
                            addonBefore="DC"
                            defaultValue={details.skillDifficulty}
                        />
                    </div>
                </div>
                <Input
                    type="textarea"
                    name="skillPass"
                    placeholder="Check Passed"
                    defaultValue={details.skillPass}
                />
                <Input
                    type="textarea"
                    name="skillFail"
                    placeholder="Check Failed"
                    defaultValue={details.skillFail}
                />
            </div>
            );
    }
});


module.exports = EncounterSkillCheckInputs;