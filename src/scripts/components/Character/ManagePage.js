'use strict';

var React = require('react/addons');

var Auth = require('../../helpers/Auth');

var Breadcrumb = require('../MainBreadcrumb');
var PageHeader = require('../ModelPageHeader');
var FormModal = require('./FormModal');
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

    render: function () {
        var self = this;

        return (
            <div id="characters-manage-page" className="page-content">
                <PageHeader pageName="Characters">
                    <FormModal onUpdate={self.getCharacters} />
                </PageHeader>
                <div className="row">
                    {self.state.characters.map(function(character) {
                        return (
                            <div key={character.id} className="col-md-6">
                                <Card character={character} onUpdate={self.getCharacters} />
                            </div>
                            );
                    })}
                </div>
            </div>
            );
    }
});

module.exports = CharacterManagePage;


