'use strict';

var React = require('react/addons');
var _ = require('lodash');
var Q = require('q');

var Auth = require('../../../helpers/Auth');

var Input = require('../../Model/FormInput');



var EncounterSocialInputs = React.createClass({
    getInitialState: function() {
        return {
            character_id: null,
            character: null,
            characterOptions: []
        }
    },

    componentWillMount: function() {
        var self = this;
        var mode = self.props.mode;

        self.getCharacterOptions()
            .done(function() {
                if (mode.isEdit) {
                    var details = self.props.attrs.details;
                    self.setState({
                        character_id: details.character_id,
                        character: details.character
                    });
                }
            });
    },

    getCharacterOptions: function() {
        var self = this;
        var deferred = Q.defer();

        Auth.User.getCharacterOptions()
            .done(function(options) {
                self.setState({characterOptions: options});

                deferred.resolve();
            });

        return deferred.promise;
    },

    handleCharacter: function(event) {
        var self = this;
        var character_id = event.target.value;
        var character = event.target.options[event.target.selectedIndex].innerHTML;

        self.setState({character_id: character_id, character: character});
    },

    render: function() {
        var attrs = this.props.attrs;
        var details = _.isObject(attrs.details) ? attrs.details : {};

        return (
            <div className="details">
                <Input
                    type="select"
                    name="character_id"
                    ref="character_id"
                    placeholder="Character"
                    options={this.state.characterOptions}
                    onChange={this.handleCharacter}
                    value={this.state.character_id}
                />
                <Input
                    type="hidden"
                    name="character"
                    ref="character"
                    value={this.state.character}
                />
                <Input
                    type="textarea"
                    name="primary"
                    placeholder="Primary Topics"
                    value={details.primary}
                />
                <Input
                    type="textarea"
                    name="secondary"
                    placeholder="Secondary Topics"
                    value={details.secondary}
                />
            </div>
            );
    }
});


module.exports = EncounterSocialInputs;