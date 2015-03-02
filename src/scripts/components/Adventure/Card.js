'use strict';

var React = require('react/addons');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Label = require('react-bootstrap').Label;

var AttrBlock = require('../Model/AttrBlock');

var InfoModal = require('./InfoModal');
var TravelModal = require('./TravelModal');

require('../../../styles/ItemCard.css');



var AdventureCard = React.createClass({
    getInitialState: function() {
        return {
            completed: null
        }
    },

    componentWillMount: function() {
        this.onComplete();
    },

    onComplete: function() {
        var save = this.props.save;
        var target = this.props.target;
        var completed;

        if (this.props.canComplete === true) {
            completed = save.isComplete(target.id);
        }

        this.setState({completed: completed});
    },

    render: function () {
        var target = this.props.target;

        var completeLabel;
        if (this.state.completed === true) {
            completeLabel = (<Label className="label-adventure" bsStyle="success">Complete</Label>);
        } else if (this.state.completed === false) {
            completeLabel = (<Label className="label-adventure" bsStyle="warning">Incomplete</Label>);
        }

        var travelLabel;
        if (this.props.canTravel === false) {
            travelLabel = (<Label className="label-travel label-adventure" bsStyle="success">Current Location</Label>);
        }
        else if (this.props.canTravel === true) {
            travelLabel = (<span />);
        }

        return (
            <div className="item-card adventure-card">
                <div className="card-header">
                    <p className="pull-left">
                        {target.attrs.name}<span>{completeLabel}</span><span>{travelLabel}</span>
                    </p>
                    <p className="pull-right">
                        <small className="text-muted">{this.props.type || target.attrs.type}</small>
                    </p>
                </div>
                <div className="card-body">
                    <AttrBlock type="flavor" attr={target.attrs.flavor} />
                    <AttrBlock type="details" attr={target.attrs.details} />
                </div>
                <div className="card-footer">
                    <ButtonToolbar className="pull-left">
                        <InfoModal target={this.props.target} save={this.props.save} info={this.props.getInfo()} canComplete={this.props.canComplete} canTravel={this.props.canTravel} onComplete={this.onComplete} onTravel={this.props.onTravel} onSave={this.props.onSave} />
                        {this.props.leftButtons}
                    </ButtonToolbar>
                    <div className="pull-right">
                        {this.props.getProgress ? this.props.getProgress() : ''}
                    </div>
                </div>
            </div>
            );
    }
});

module.exports = AdventureCard;