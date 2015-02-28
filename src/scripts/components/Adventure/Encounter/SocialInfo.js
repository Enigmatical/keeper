'use strict';

var React = require('react/addons');
var _ = require('lodash');

var CharacterModel = require('../../../models/CharacterModel');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var AttrBlock = require('../../Model/AttrBlock');



var EncounterSocialAdventureInfo = React.createClass({
    getInitialState: function() {
        return {
            character: null
        }
    },

    componentWillMount: function() {
        this.getCharacter();
    },

    getCharacter: function() {
        var self = this;
        var character_id = this.props.data.details.character_id;

        new CharacterModel().get(character_id)
            .done(function(character) {
                self.setState({character: character});
            });
    },

    render: function () {
        var self = this;
        var data = this.props.data;
        var details = this.props.data.details;

        var character = this.state.character;

        if (_.isObject(character)) {
            return (
                <div>
                    <div className="card-body">
                        <div className="text-alizarin">
                            <p className="body-header">{character.attrs.name} <small>{character.attrs.type}</small></p>
                            <AttrBlock attr={character.attrs.flavor} markdown />
                            <AttrBlock attr={character.attrs.details} markdown />
                        </div>
                        <AttrBlock name="Primary Topics" text="peterriver" attr={details.primary} markdown />
                        <AttrBlock name="Secondary Topics" text="amethyst" attr={details.secondary} markdown />
                    </div>
                </div>
                );
        }
        else {
            return (<span />);
        }

    }
});

module.exports = EncounterSocialAdventureInfo;