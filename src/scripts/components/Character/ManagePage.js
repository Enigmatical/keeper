'use strict';

var React = require('react/addons');

var Auth = require('../../helpers/Auth');

var Breadcrumb = require('../Common/Breadcrumb');
var PageHeader = require('../Model/PageHeader');
var FormModal = require('../Model/FormModal');
var Input = require('../Model/FormInput');

var Model = require('../../models/CharacterModel');
var Card = require('./Card');



var CharacterManagePage = React.createClass({
    mixins: [Auth],

    getInitialState: function() {
        return {
            characters: []
        }
    },

    componentWillMount: function() {
        this.getCharacters();
    },

    getCharacters: function() {
        var self = this;

        Auth.User.getCharacters().then(function(characters) {
            self.setState({characters: characters});
        });
    },

    getCharacterInputs: function(attrs) {
        return (
            <div>
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
            </div>
            );
    },

    render: function () {
        var self = this;

        return (
            <div id="characters-manage-page" className="page-content">
                <PageHeader pageName="Characters">
                    <FormModal model={Model} parent={Auth.User} inputs={self.getCharacterInputs.bind(self, {})} onUpdate={self.getCharacters} />
                </PageHeader>
                <div className="row">
                    {self.state.characters.map(function(character) {
                        return (
                            <div key={character.id} className="col-md-6">
                                <Card model={Model} character={character} inputs={self.getCharacterInputs.bind(self, character.attrs)} onUpdate={self.getCharacters} />
                            </div>
                            );
                    })}
                </div>
            </div>
            );
    }
});

module.exports = CharacterManagePage;


