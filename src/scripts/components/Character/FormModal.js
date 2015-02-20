'use strict';

var React = require('react/addons');
var _ = require('lodash');

var Auth = require('../../helpers/Auth');

var Model = require('../../models/CharacterModel');

var Modal = require('../Model/FormModal');
var Input = require('../Model/FormInput');



var CharacterFormModal = React.createClass({
    render: function() {
        var character = _.isObject(this.props.character) ? this.props.character : undefined;
        var attrs = _.isObject(character) ? character.attrs : {};

        return (
            <Modal
                titlePart="Character"
                model={Model}

                target={character}
                related={Auth.User}
                relatedKey="user_id"

                className={this.props.className}
                onUpdate={this.props.onUpdate}
            >
                <Input
                    type="text"
                    name="name"
                    defaultValue={attrs.name}
                />

                <Input
                    type="text"
                    name="type"
                    placeholder="Race & Class"
                    defaultValue={attrs.type}
                />

                <Input
                    type="textarea"
                    name="flavor"
                    placeholder="Personality"
                    defaultValue={attrs.flavor}
                />

                <Input
                    type="textarea"
                    name="details"
                    placeholder="Stats & Skills"
                    defaultValue={attrs.details}
                />
            </Modal>
            );
    }
});

module.exports = CharacterFormModal;