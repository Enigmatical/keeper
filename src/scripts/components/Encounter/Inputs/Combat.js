'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Q = require('q');

var Auth = require('../../../helpers/Auth');

var Input = require('../../Model/FormInput');



var EncounterCombatInputs = React.createClass({
    getInitialState: function() {
        return {
            battle_id: null,
            battle: null,
            battleOptions: []
        }
    },

    componentWillMount: function() {
        var self = this;
        var mode = self.props.mode;

        self.getBattleOptions()
            .done(function() {
                if (mode.isEdit) {
                    var details = self.props.attrs.details;
                    self.setState({
                        battle_id: details.battle_id,
                        battle: details.battle
                    });
                }
            });
    },

    getBattleOptions: function() {
        var self = this;
        var deferred = Q.defer();

        Auth.User.getBattleOptions()
            .done(function(options) {
                self.setState({battleOptions: options});

                deferred.resolve();
            });

        return deferred.promise;
    },

    handleBattle: function(event) {
        var self = this;
        var battle_id = event.target.value;
        var battle = event.target.options[event.target.selectedIndex].innerHTML;

        self.setState({battle_id: battle_id, battle: battle});
    },

    render: function() {
        var attrs = this.props.attrs;
        var details = _.isObject(attrs.details) ? attrs.details : {};

        return (
            <div className="details">
                <Input
                    type="select"
                    name="battle_id"
                    ref="battle_id"
                    placeholder="Battle"
                    options={this.state.battleOptions}
                    onChange={this.handleBattle}
                    value={this.state.battle_id}
                />
                <Input
                    type="hidden"
                    name="battle"
                    ref="battle"
                    value={this.state.battle}
                />
                <Input
                    type="textarea"
                    name="rewardOther"
                    placeholder="Rewards"
                    value={details.rewardOther}
                />
            </div>
            );
    }
});


module.exports = EncounterCombatInputs;