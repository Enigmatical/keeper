'use strict';

var React = require('react/addons');

var Auth = require('../../helpers/Auth');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var FormModal = require('../Model/FormModal');
var CloneModal = require('../Model/CloneModal');
var RemoveModal = require('../Model/RemoveModal');
var AttrBlock = require('../Model/AttrBlock');
var Input = require('../Model/FormInput');

var ActorModel = require('../../models/ActorModel');
var ActorCard = require('../Actor/Card');

var EncounterFormModal = require('../Encounter/FormModal');
var EncounterCard = require('../Encounter/Card');

require('../../../styles/ItemCard.css');



var AreaCard = React.createClass({
    getInitialState: function() {
        return {
            characterOptions: [],
            actors: [],
            encounters: []
        }
    },

    componentWillMount: function() {
        this.getActors();
        this.getCharacterOptions();
    },

    getActors: function() {
        var self = this;
        var area = self.props.area;

        area.getActors()
            .done(function(actors) {
                self.setState({actors: actors});
            });
    },

    getCharacterOptions: function() {
        var self = this;

        Auth.User.getCharacterOptions()
            .done(function(options) {
                self.setState({characterOptions: options});
            });
    },

    getActorInputs: function(attrs) {
        return (
            <div>
                <Input
                    type="select"
                    name="character_id"
                    placeholder="Character"
                    defaultValue={attrs.character_id}
                    options={this.state.characterOptions}
                />
                <Input
                    type="textarea"
                    name="details"
                    placeholder="Motive (Why Am I Here?)"
                    defaultValue={attrs.details}
                />
                <Input
                    type="textarea"
                    name="flavor"
                    placeholder="Activity (What Am I Doing?)"
                    defaultValue={attrs.flavor}
                />
            </div>
            );
    },

    getEncounters: function() {
        var self = this;
        var area = self.props.area;

        area.getEncounters()
            .done(function(encounters) {
                self.setState({encounters: encounters});
            });
    },

    render: function () {
        var self = this;
        var campaign = self.props.campaign;
        var location = self.props.location;
        var area = self.props.area;

        var actors = function() {
            var actors = self.state.actors;

            if (actors.length > 0) {
                return (
                    <section className="row">
                        <div className="card-links col-md-12">
                            <p className="body-header">Actors</p>
                            {self.state.actors.map(function(actor) {
                                return (
                                    <ActorCard key={actor.id} target={actor} parent={area} model={ActorModel} inputs={self.getActorInputs.bind(self, actor.attrs)} onUpdate={self.getActors} />
                                    );
                            })}
                        </div>
                    </section>
                    );
            }
            else {
                return (<span />);
            }
        };

        var encounters = function() {
            var encounters = self.state.encounters;

            if (encounters.length > 0) {
                return (
                    <section className="row">
                        <div className="card-links col-md-12">
                            <p className="body-header">Encounters</p>
                            {self.state.encounters.map(function(encounter) {
                                return (
                                    <EncounterCard key={encounter.id} target={encounter} parent={area} campaign={campaign} onUpdate={self.getEncounters} />
                                    );
                            })}
                        </div>
                    </section>
                    );
            }
        };

        return (
            <div className="item-card area-card">
                <div className="card-header">
                    <p className="pull-left">
                        {area.attrs.name}
                    </p>
                    <p className="pull-right">
                        <small className="text-muted">{area.attrs.type}</small>
                    </p>
                </div>
                <div className="card-body">
                    <AttrBlock type="flavor" attr={area.attrs.flavor} />
                    <AttrBlock type="details" attr={area.attrs.details} />
                    {actors()}
                    {encounters()}
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <FormModal link={true} model={ActorModel} parent={area} inputs={self.getActorInputs.bind(self, {})} onUpdate={self.getActors} />
                        <EncounterFormModal link={true} parent={area} campaign={campaign} onUpdate={self.getEncounters} />
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal target={area} model={this.props.model} parent={location} inputs={this.props.inputs} onUpdate={this.props.onUpdate} />
                        <CloneModal target={area} model={this.props.model} parent={location} onUpdate={this.props.onUpdate} />
                        <RemoveModal target={area} onUpdate={this.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = AreaCard;