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
                        <section className="row">
                            <div className="col-md-12">
                                <div className="text-pumpkin bg-pumpkin">
                                    <p className="body-header">{character.attrs.name}&nbsp;&nbsp;&nbsp;<small>{character.attrs.type}</small></p>
                                    <section className="row">
                                        <AttrBlock type="custom" className="text-wetasphalt" attr={character.attrs.details} />
                                    </section>
                                </div>
                            </div>
                        </section>
                        <section className="row">
                            <AttrBlock type="custom" name="Primary Topics" className="text-peterriver bg-peterriver" attr={details.primary} />
                        </section>
                        <section className="row">
                            <AttrBlock type="custom" name="Secondary Topics" className="text-amethyst bg-amethyst" attr={details.secondary} />
                        </section>
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