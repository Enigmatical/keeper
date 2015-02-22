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

require('../../../styles/ItemCard.css');



var AreaCard = React.createClass({
    getInitialState: function() {
        return {
            actors: [],
            characterOptions: []
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

    render: function () {
        var self = this;
        var location = self.props.location;
        var area = self.props.area;

        var actors = function() {
            var actors = self.state.actors;

            if (actors.length > 0) {
                return (
                    <div className="card-links">
                        <p className="body-header">Actors</p>
                        {self.state.actors.map(function(actor) {
                            return (
                                <ActorCard key={actor.id} target={actor} parent={area} model={ActorModel} inputs={self.getActorInputs.bind(self, actor.attrs)} onUpdate={self.getActors} />
                                );
                        })}
                    </div>
                    );
            }
            else {
                return (<span />);
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
                    <AttrBlock name="Flavor" attr={area.attrs.flavor} markdown />
                    <AttrBlock name="Details" attr={area.attrs.details} markdown />
                    {actors()}
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <FormModal link={true} model={ActorModel} parent={area} inputs={self.getActorInputs.bind(self, {})} onUpdate={self.getActors} />
                        <Button bsStyle="warning" bsSize="small"><Glyphicon glyph="plus" /> Encounter</Button>
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal target={area} model={this.props.model} parent={location} inputs={this.props.inputs} onUpdate={this.props.onUpdate} />
                        <RemoveModal target={area} onUpdate={this.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = AreaCard;