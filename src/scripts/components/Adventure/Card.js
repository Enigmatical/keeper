'use strict';

var React = require('react/addons');

var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var Button = require('react-bootstrap').Button;
var ButtonLink = require('react-router-bootstrap').ButtonLink;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Label = require('react-bootstrap').Label;

var AttrBlock = require('../Model/AttrBlock');

var InfoModal = require('./InfoModal');

require('../../../styles/ItemCard.css');



var AdventureCard = React.createClass({
    getInitialState: function() {
        return {
            completed: null
        }
    },

    componentWillMount: function() {
        this.getComplete();
    },

    getComplete: function() {
        if (this.props.canComplete === true) {
            var save = this.props.save;
            var target = this.props.target;

            this.setState({completed: save.isComplete(target.id)});
        }
    },

    render: function () {
        var target = this.props.target;

        var completeLabel;
        if (this.state.completed === true) {
            completeLabel = (<Label className="completelabel-adventure" bsStyle="success">Complete</Label>);
        } else if (this.state.completed === false) {
            completeLabel = (<Label className="completelabel-adventure" bsStyle="warning">Incomplete</Label>);
        }

        return (
            <div className="item-card adventure-card">
                <div className="card-header">
                    <p className="pull-left">
                        {target.attrs.name} {completeLabel}
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
                        <InfoModal target={this.props.target} save={this.props.save} info={this.props.getInfo()} canComplete={this.props.canComplete} onComplete={this.getComplete} onSave={this.props.onSave} />
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