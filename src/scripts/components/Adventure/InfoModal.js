'use strict';

var React = require('react/addons');
var _ = require('lodash');

var OverlayMixin = require('react-bootstrap').OverlayMixin;
var Modal = require('react-bootstrap').Modal;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;

var EncounterCard = require('./Encounter/Card');
var ActorCard = require('./Actor/Card');

var CompleteButton = require('./CompleteButton');

var TravelModal = require('./TravelModal');



var AdventureInfoModal = React.createClass({
    mixins: [OverlayMixin],

    getInitialState: function() {
        return {
            actors: [],
            encounters: [],
            isModalOpen: false
        };
    },

    componentWillMount: function() {
        this.getActors();
        this.getEncounters();
    },

    getActors: function() {
        var self = this;
        var target = this.props.target;

        if (_.isFunction(target.getActors)) {
            target.getActors()
                .done(function(actors) {
                    self.setState({actors: actors});
                });
        }
    },

    getEncounters: function() {
        var self = this;
        var target = this.props.target;

        if (_.isFunction(target.getEncounters)) {
            target.getEncounters()
                .done(function(encounters) {
                    self.setState({encounters: encounters});
                });
        }
    },

    handleToggle: function() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    },

    render: function () {
        return (
            <Button bsStyle="info" onClick={this.handleToggle}><Glyphicon glyph="info-sign" /> Info</Button>
            );
    },

    renderOverlay: function() {
        var self = this;
        var save = self.props.save;
        var target = self.props.target;
        var canComplete = self.props.canComplete;
        var canTravel = self.props.canTravel;

        var completeButton = (<span />);
        if (canComplete === true) {
            completeButton = (<CompleteButton target={target} save={save} onComplete={self.props.onComplete} onSave={self.props.onSave} />);
        }

        var travelModal = (<span />);
        if (canTravel === true) {
            console.log(self.props.onTravel);
            console.log(self.props.onSave);
            travelModal = (<TravelModal target={target} save={save} onComplete={self.props.onTravel} onSave={self.props.onSave} />);
        }

        var encounters = function() {
            if (self.state.encounters.length > 0) {
                return(
                    <section className="row">
                        <div className="col-md-12">
                            <p className="body-header">Encounters</p>
                            {self.state.encounters.map(function(encounter) {
                                return (
                                    <EncounterCard key={encounter.id} target={encounter} save={save} onSave={self.props.onSave} />
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

        var actors = function() {
            if (self.state.actors.length > 0) {
                return (
                    <section className="row">
                        <div className="col-md-12">
                            <p className="body-header">Actors</p>
                            {self.state.actors.map(function(actor) {
                                return (
                                    <ActorCard key={actor.id} target={actor} save={save} onSave={self.props.onSave} />
                                    );
                            })}
                        </div>
                    </section>
                    )
            }
        };

        if (!this.state.isModalOpen) {
            return <span />;
        }

        return (
            <Modal title={target.attrs.name} className="info-adventure" bsSize="large" onRequestHide={self.handleToggle}>
                <div className="modal-body">
                    {this.props.info}
                    {actors()}
                    {encounters()}
                </div>
                <div className="modal-footer">
                    <ButtonToolbar>
                        {travelModal}
                        {completeButton}
                        <Button onClick={this.handleToggle}>Close</Button>
                    </ButtonToolbar>
                </div>
            </Modal>
            );
    }
});

module.exports = AdventureInfoModal;