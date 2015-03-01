'use strict';

var React = require('react/addons');
var Markdown = require('markdown').markdown;

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;

var FormModal = require('../Model/FormModal');
var RemoveModal = require('../Model/RemoveModal');
var AttrBlock = require('../Model/AttrBlock');

var EncounterFormModal = require('../Encounter/FormModal');
var EncounterCard = require('../Encounter/Card');

require('../../../styles/ItemCard.css');



var TaskCard = React.createClass({
    getInitialState: function() {
        return {
            encounters: []
        }
    },

    componentWillMount: function() {
        this.getEncounters();
    },

    getEncounters: function() {
        var self = this;
        var task = self.props.task;

        task.getEncounters()
            .done(function(encounters) {
                self.setState({encounters: encounters});
            });
    },

    render: function () {
        var self = this;
        var campaign = this.props.campaign;
        var act = this.props.act;
        var quest = this.props.quest;
        var task = this.props.task;

        var encounters = function() {
            var encounters = self.state.encounters;

            if (encounters.length > 0) {
                return (
                    <section className="row">
                        <div className="card-links col-md-12">
                            <p className="body-header">Encounters</p>
                            {self.state.encounters.map(function(encounter) {
                                return (
                                    <EncounterCard key={encounter.id} target={encounter} parent={task} campaign={campaign} onUpdate={self.getEncounters} />
                                    );
                            })}
                        </div>
                    </section>
                    );
            }
        };

        return (
            <div className="item-card task-card">
                <div className="card-header">
                    <p className="pull-left">
                        {task.attrs.name}
                    </p>
                    <p className="pull-right">
                        <span />
                    </p>
                </div>
                <div className="card-body">
                    <AttrBlock type="flavor" attr={task.attrs.flavor} />
                    <AttrBlock type="details" attr={task.attrs.details} />
                    {encounters()}
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <EncounterFormModal link={true} parent={task} campaign={campaign} onUpdate={self.getEncounters} />
                    </ButtonToolbar>
                    <ButtonToolbar className="pull-right">
                        <FormModal target={task} model={this.props.model} parent={task} inputs={this.props.inputs} onUpdate={this.props.onUpdate} />
                        <RemoveModal target={task} onUpdate={this.props.onUpdate} />
                    </ButtonToolbar>
                </div>
            </div>
            );
    }
});

module.exports = TaskCard;


