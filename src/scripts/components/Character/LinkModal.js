'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Auth = require('../../helpers/Auth');

var Model = require('../../models/CharacterModel');

var Modal = require('../Model/LinkModal');
var Input = require('../Model/FormInput');
var Link = require('react-router').Link;
var Glyphicon = require('react-bootstrap').Glyphicon;



var CharacterLinkModal = React.createClass({
    getInitialState: function() {
        return {
            options: []
        }
    },

    getOptions: function() {
        var self = this;
        var options = [];

        Auth.User.getCharacters()
            .then(function(characters) {
                _.each(characters, function(character) {
                    var label = character.attrs.name + ' (' + character.attrs.type + ')';
                    var option = {
                        label: label,
                        value: character.id
                    };
                    options.push(option);
                });

                self.setState({options: options});
            });
    },

    render: function() {
        return (
            <Modal
                titlePart={this.props.name || "Character"}
                target={this.props.target}

                className={this.props.className}
                onOpen={this.getOptions}
                onUpdate={this.props.onUpdate}
            >

                <Input
                    type="select"
                    name="id"
                    placeholder="Character"
                    options={this.state.options}
                />

            </Modal>
            );
    }
});

module.exports = CharacterLinkModal;


