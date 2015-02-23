'use strict';

var React = require('react/addons');

var Auth = require('../../helpers/Auth');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var FormModal = require('../Model/FormModal');
var RemoveModal = require('../Model/RemoveModal');
var AttrBlock = require('../Model/AttrBlock');
var Input = require('../Model/FormInput');

var ActorModel = require('../../models/ActorModel');
var ActorCard = require('../Actor/Card');

var EncounterFormModal = require('../Encounter/FormModal');
var EncounterCard = require('../Encounter/Card');

require('../../../styles/ItemCard.css');



var ShopCard = React.createClass({
    getInitialState: function() {
        return {
            characterOptions: [],
            actors: [],
            encounters: []
        }
    },

    componentWillMount: function() {
        this.getCharacterOptions();
        this.getActors();
        this.getEncounters();
    },

    getCharacterOptions: function() {
        var self = this;

        Auth.User.getCharacterOptions()
            .done(function(options) {
                self.setState({characterOptions: options});
            })
    },

    getActors: function() {
        var self = this;
        var shop = self.props.shop;

        shop.getActors()
            .done(function(actors) {
                self.setState({actors: actors});
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
        var shop = self.props.shop;

        shop.getEncounters()
            .done(function(encounters) {
                self.setState({encounters: encounters});
            })
    },

    render: function () {
        var self = this;
        var location = self.props.location;
        var shop = self.props.shop;

        var actors = function() {
            var actors = self.state.actors;

            if (actors.length > 0) {
                return (
                    <div className="card-links">
                        <p className="body-header">Actors</p>
                        {self.state.actors.map(function(actor) {
                            return (
                                <ActorCard key={actor.id} target={actor} parent={shop} model={ActorModel} inputs={self.getActorInputs.bind(self, actor.attrs)} onUpdate={self.getActors} />
                                );
                        })}
                    </div>
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
                    <div className="card-links">
                        <p className="body-header">Encounters</p>
                        {self.state.encounters.map(function(encounter) {
                            return (
                                <EncounterCard key={encounter.id} target={encounter} parent={shop} campaign={self.props.campaign} onUpdate={self.getEncounters} />
                                );
                        })}
                    </div>
                    );
            }
        };

        return (
            <div className="item-card shop-card">
                <div className="card-header">
                    <p className="pull-left">
                        {shop.attrs.name}
                    </p>
                    <p className="pull-right">
                        <small className="text-muted">{_.startCase(shop.attrs.type)}, <strong>{_.startCase(shop.attrs.quality)}</strong></small>
                    </p>
                </div>
                <div className="card-body">
                    <AttrBlock name="Flavor" attr={shop.attrs.flavor} markdown />
                    <AttrBlock name="Details" attr={shop.attrs.details} markdown />
                    {actors()}
                    {encounters()}
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <FormModal link={true} model={ActorModel} parent={shop} inputs={self.getActorInputs.bind(self, {})} onUpdate={self.getActors} />
                        <EncounterFormModal link={true} parent={shop} campaign={self.props.campaign} onUpdate={self.getEncounters} />
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal target={shop} model={self.props.model} parent={location} inputs={self.props.inputs} onUpdate={self.props.onUpdate} />
                        <RemoveModal target={shop} onUpdate={self.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = ShopCard;


